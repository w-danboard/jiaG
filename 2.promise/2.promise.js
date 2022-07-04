let Promise = require('./promise')

// let p = new Promise((resolve, reject) => {
//   resolve(123)
// })

// p.then(data => {
//   throw new Error('错误')
// }, err => {
//   return err + 400
// }).then(data => {
//   console.log(data)
//   return 222
// }, err => {
//   console.log(err, '----')
// }).then(data => {
//   console.log(data)
// })

// to refer same object 会导致无法继续执行 因为这个promise不会成功也不会失败
let promise = new Promise((resolve, reject) => {
  resolve()
})

let promise2 = promise.then(data => {
  return promise2
})

promise2.then(function (data) {
  console.log(data, '我是data')
}, function (err) {
  console.log(err, '===>')
})