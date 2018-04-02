import * as Koa from 'koa'
import * as path from 'path'
import * as fs from 'fs'
import * as React from 'react'
import * as ReactDOMServer from 'react-dom/server'
import * as Router from 'koa-router'
import * as serve from 'koa-static'
import * as elastic from 'elasticsearch'
import Home from '../views/Home'

(async () => {
  const app = new Koa()
  const router = new Router({prefix: '/search'});
  const publicFolder = path.join(__dirname, '..', '..', 'public')
  const client = new elastic.Client({host: process.env.BONSAI_URI})
  const search = async (query?: string) => {
    return client.search({
      index: 'moments',
      type: 'moment',
      body: {
        size : 30,
        query: !!query ? {
          multi_match: {
            query: query,
            fields: ['tags', 'title']
          }
        } : {
          match_all: {}
        }
      }
    })
  }

  console.log('ping', await client.ping())
  
  router.get('/', async context => {
    context.body = await search(context.query.q)
    context.status = 200
  });
  
  app.use(router.routes())
  app.use(serve(publicFolder))
  
  const files = await fs.readdirSync(publicFolder)
  const scripts = files.filter(file => file.indexOf('.js') > 0 && file.indexOf('.map') < 0)
  const styles = files.filter(file => file.indexOf('.css') > 0)
  const moments = await search()

  // Index
  app.use(ctx => {
    ctx.body = ReactDOMServer.renderToStaticMarkup(
      <Home
        scripts={scripts}
        styles={styles}
        moments={moments.hits.hits.map(hit => hit._source)}
      />
    )
  })
  
  app.listen( process.env.PORT || 3000, () => {
    console.log('started')
  })
  
})()
