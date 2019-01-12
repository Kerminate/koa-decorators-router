const { controller, get, post, middleware } = require('../lib/decorator')
const { log, validate } = require('../middlewares/user')

@controller('api/user')
class userController {
  @post('/')
  async login (ctx, next) {
    ctx.body = {
      login: true,
      msg: '登录成功'
    }
  }

  @get('/info')
  @middleware(log, validate)
  async getUserInfo (ctx, next) {
    ctx.body = {
      username: 'Kerminate',
      job: 'programmer'
    }
  }
}

export default userController
