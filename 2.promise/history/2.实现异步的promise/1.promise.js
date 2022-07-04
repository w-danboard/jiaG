// Promise 是一个类 它代表承诺 允诺 三个状态 [异步解决方案]
// pending 等待状态 -> fulfilled 成功
// pending 等待状态 -> rejected 失败
// 成功态和失败态 不能相互转化
// executor函数 会立即执行，参数是resolve函数 和 reject函数
// 每个promise实例都有一个then方法

let Promise = require('./promise')
let promise = new Promise(function (resolve, rejecte) { // executor 执行器
  setTimeout(() => {
    resolve('成功')
  },1000)
})

// onfulfilled, onrejected
promise.then(function (val) {
  console.log(val, 'success')
}, function (err) {
  console.log(err, 'fail')
})

// onfulfilled, onrejected
promise.then(function (val) {
  console.log(val, 'success')
}, function (err) {
  console.log(err, 'fail')
})

// onfulfilled, onrejected
promise.then(function (val) {
  console.log(val, 'success')
}, function (err) {
  console.log(err, 'fail')
})