import * as elastic from 'elasticsearch'
import * as path from 'path'

(async ()=> {
    const client = new elastic.Client({host: process.env.BONSAI_URI})
    const ping = await client.ping()
    const index = 'moments'
    const momentsJson = path.join(__dirname, '..', '..', 'resources', 'moments.json')
    const moments = require(momentsJson)

    if (!ping) {
        console.log('There is no ping')
        return
    }

    await client.indices.delete({index})
    await client.indices.create({
        index,
        body: {
            settings: {
                number_of_shards: 1, 
                number_of_replicas: 1,
                analysis: {
                    filter: {
                        autocomplete_filter: { 
                            type:     'edge_ngram',
                            min_gram: 3,
                            max_gram: 20
                        }
                    },
                    analyzer: {
                        autocomplete: {
                            type:      'custom',
                            tokenizer: 'standard',
                            filter: [
                                'lowercase',
                                'autocomplete_filter' 
                            ]
                        }
                    }
                }
            },
            mappings: {
                moment: {
                    properties: {
                        id: {type: 'keyword'},
                        date: {type: 'date' },
                        title: {type: 'text', analyzer: 'autocomplete'},
                        description: {type: 'text', analyzer: 'autocomplete'},
                        tags: {type: 'text', analyzer: 'autocomplete', fields: {raw: {type: 'keyword'}}},
                        pictureURL: {type: 'keyword'},
                    }
                }
            },
        }
    })
    await client.bulk({
        body: moments.reduce((result, moment) => {
            result.push({ index:  { _index: index, _type: 'moment', _id: Number(moment.id) } })
            result.push({...moment, date: new Date(moment.date)})
            return result
        }, [])
    })
})()