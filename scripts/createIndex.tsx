import * as elastic from 'elasticsearch'

(async ()=> {
    const client = new elastic.Client({host: process.env.BONSAI_URI})
    const ping = await client.ping()
    const index = 'moments'
    if (!ping) {
        console.log('There is no ping')
        return
    }
    await client.indices.delete({index})
    await client.indices.create({
        index,
        body: {
            settings: {
                'number_of_shards': 1,
                'number_of_replicas': 1,
                analysis: {
                    analyzer: {
                        fts: {
                            type:'custom',
                            tokenizer:'ngram',
                            filter:[
                                'lowercase'
                            ]
                        }
                    },
                },
            },
            mappings: {
                moment: {
                    properties: {
                        id: {type: 'keyword'},
                        date: {type: 'date' },
                        title: {type: 'text', analyzer: 'fts'},
                        description: {type: 'text', analyzer: 'fts'},
                        tags: {type: 'text', analyzer: 'fts', fields: {raw: {type: 'keyword'}}},
                        pictureURL: {type: 'keyword'},
                    }
                }
            },
        }
    })
    await client.bulk({
        body: [
            { index:  { _index: index, _type: 'moment', _id: 1 } },
            {
                id: 1,
                date: new Date(),
                title: 'This is a title',
                description: 'Nice description',
                tags: ['picture', 'jonathan', 'staruday'],
                pictureURL: 'https://my.picture.com/123123'
            }
        ]
    })
})()