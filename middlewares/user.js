const validate = async (ctx, next) => {
  if (ctx.query.user === '123') {
    return next()
  } else {
    ctx.throw(400, '用户名不存在')
  }
}

const log = async (ctx, next) => {
  console.log(ctx.query)
  return next()
}

module.exports = {
  validate,
  log
}
