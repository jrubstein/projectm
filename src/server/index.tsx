import * as Koa from 'koa'
import * as path from 'path'
import * as fs from 'fs'
import * as React from 'react'
import * as ReactDOMServer from 'react-dom/server'
import * as Router from 'koa-router'
import * as serve from 'koa-static'
import Home from '../views/Home'

(async () => {
  const app = new Koa()
  const router = new Router({prefix: '/search'});
  const publicFolder = path.join(__dirname, '..', 'public')
  
  router.get('/', context => {
    context.body = {hits: []}
    context.status = 200
  });
  
  app.use(router.routes())
  app.use(serve(publicFolder))
  
  const files = await fs.readdirSync(publicFolder)
  const scripts = files.filter(file => file.indexOf('.js') > 0)
  const styles = files.filter(file => file.indexOf('.css') > 0)

  // Index
  app.use(ctx => {
    ctx.body = ReactDOMServer.renderToStaticMarkup(<Home scripts={scripts} styles={styles}/>)
  })
  
  app.listen(3000, () => {
    console.log('started')
  })
  
})()
