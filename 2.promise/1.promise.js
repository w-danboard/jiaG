// let Promise = require('./promise')
// promise怎么变成失败状态 reject  new Error
// 恶魔金字塔 回调嵌套
let fs = require('fs')
// fs.readFile('./name.txt', 'utf8', function (err, data) {
//   fs.readFile(`./${data}`, 'utf8', function (err, data){
//     console.log(data)
//   })
// })
function read (url) {
  return new Promise((resolve, reject) => {
    fs.readFile(url, 'utf8', function (err, data) {
      if (err) return reject(err)
      resolve(data)
    })
  })
}
// 链式调用 不是jquery的方式 返回this
// 1）如果then方法中返回的是一个promise 那我就采用这个promise的状态 作为成功或者失败 把promise的结果作为参数
// 2）如果返回的是一个普通纸 直接作为下一个then的成功的参数
// 3) 在then方法中抛出异常 也会走失败 若果错误中返回一个普通纸 也会变成成功态
// * 每一个then方法都返回一个新的promise
read('./name.txt', 'utf8').then(data => {
  // 如果返回的是一个promise 会让这个promise执行 并且会采用它的状态作为下一个then的值
  return read(data + 1)
}).then(data => {
  console.log(data)
  throw new Error('错误')
}, (err) => {
  console.log(err)
  return 1
}).then(data => {
  console.log(data, '===>')
})
// 必须返回一个新的promise
// let p = new Promise((resolve, reject) => {
//   reject()
// })
// let p2 = p.then(null, () => {
//   return 100
// })
// p2.then(data => {
//   console.log(data)
// })