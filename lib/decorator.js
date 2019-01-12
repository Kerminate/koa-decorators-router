const path = require('path')
const Router = require('koa-router')
const glob = require('glob')

const symbolPrefix = Symbol('prefix')
const routerMap = new Map()
const isArray = obj => Array.isArray(obj) ? obj : [obj]
const formatPath = path => path.startsWith('/') ? path : `/${path}`

const router = conf => (target, name, descriptor) => {
  conf.path = formatPath(conf.path)
  routerMap.set({
    target,
    ...conf
  }, target[name])
}

const controller = path => target => (target.prototype[symbolPrefix] = path)

class Route {
  constructor (app, apiPath) {
    this.app = app
    this.apiPath = apiPath
    this.router = new Router()
  }

  init () {
    // 将 api 文件接口全部同步载入
    glob.sync(path.resolve(this.apiPath, './*.js')).forEach(require)

    for (let [conf, controller] of routerMap) {
      const controllers = isArray(controller)
      const prefixPath = conf.target[symbolPrefix] ? formatPath(conf.target[symbolPrefix]) : ''
      const routerPath = prefixPath + conf.path
      this.router[conf.method](routerPath, ...controllers)
    }

    this.app.use(this.router.routes())
    this.app.use(this.router.allowedMethods())
  }
}

const methods = {}
;['head', 'options', 'get', 'post', 'put', 'del', 'patch', 'all'].forEach((key) => {
  methods[key] = (path) => {
    return router({
      method: key,
      path
    })
  }
})

const middleware = (...mids) => {
  return (...args) => {
    const [target, name, descriptor] = args
    target[name] = isArray(target[name])
    target[name].unshift(...mids)
    return descriptor
  }
}

module.exports = {
  controller,
  Route,
  ...methods,
  middleware
}
