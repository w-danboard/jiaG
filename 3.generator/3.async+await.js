// 1.callback 多个请求并发 不好管理 链式调佣 导致回调嵌套过多
// 2.promise 优点 可以优雅的处理异步 处理错误 基于回调的 还是可能会有嵌套问题
// 3.generator + co dva 让代码像同步 不能支持try catch
// 4.async + await 解决异步问题 而且支持try catch

async function read () {
  let r = await Promise.resolve(1)
  let age = await Promise.resolve(1 + r)
  let e = await [age]
  return e
}

// async 函数执行后返回的是一个promise
// 如果被try + catch 那么这个promise返回的就是真
read().then(data => {
  console.log(data)
})