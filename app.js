require('@babel/register')()
require('@babel/polyfill')
const Koa = require('koa')
const path = require('path')
const { Route } = require('./lib/decorator')

const app = new Koa()

const apiPath = path.resolve(__dirname, './routes')
const router = new Route(app, apiPath)

router.init()

app.listen(3000, () => {
  console.log('server is running at localhost:3000')
})
