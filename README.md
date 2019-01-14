# koa-decorators-router

使用以下命令运行
```
npm run start
```

在浏览器里输入 `http://localhost:3000/api/user/info?user=123` 可以看到有 json 数据返回

使用 Decorator 包装路由，实现效果如下

```javascript
const { controller, get, post, middleware } = require('../lib/decorator')
const { log, validate } = require('../middlewares/user')

@controller('api/user')
class userController {
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
```

`controller`, `get`, `post`, `middleware` 是对路由作了一层包装后暴露出来的接口，`log`, `validate` 则是两个中间件

使用过程注意
get 等请求一定要写在中间件的装饰器上面
