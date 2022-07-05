let Promise = require('./promise')
/**
 * executor函数先执行，成功调用resolve, 失败调用reject
 */
let p = new Promise((resolve, reject) => {
  throw new Error('出错拉') // 会直接让promise变为失败态
})

p.then().then().then().then(null, function (err) {
  console.log(err, '---')
})

// -------------------------------------------------------

let promise2 = new Promise((resolve, reject) => {
  // 如果没有直接调用resolve或者reject方法，而是异步中调用
  setTimeout(() => {
    resolve()
  })
})

promise2.then(() => {
  // 如果返回的是普通值，就直接传递给下一个then里的成功或者失败
  // 如果返回的是Promise，就让Promise执行，再返回给下一个then
  return new Promise
}, () => {}).then(data => {
  console.log(data)
})

// -------------------------------------------------------

// 示例promise3 需要递归
let promise3 = promise2.then(_ => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(new Promise((resolve, reject) => {
            setTimeout(() => {
              resolve(2000)
            }, 2000)
          }))
        })
      }))
    })
  })
})

promise3.then(data => {
  console.log(data)
})

// -------------------------------------------------------
let Promise = require('./promise')
let fs = require('fs')

// anguar1.0 defer 对象 Q
function read (url) {
  // 延迟对象
  let defer = Promise.deferred() // { promise, resolve, reject }
  fs.readFile(url, 'utf8', function (err, data) {
    if (err) return defer.reject(err)
    defer.resolve(data)
  })
  return defer.promise
}

read('./name.txt').then(data => {
  console.log(data)
})

// -------------------------------------------------------
let Promise = require('./promise')

// 示例：catch
let p = new Promise((resolve, reject) => {
  reject('123')
})

p.then(null, err => {
  throw err
}).catch(err => {
  console.log(err)
}).then(data => {
  console.log(data, '---')
})

// -------------------------------------------------------
let Promise = require('./promise')

// 作业：实现一个finally

let p = new Promise((resolve, reject) => {
  reject('123')
})

p.then(null, err => {
  console.log(err)
}).then(data => {
  throw new Error('错误')
}).finally(() => { // 无论如何都执行
  console.log('1000')
}).catch(err => {
  console.log('err', err)
})

// -------------------------------------------------------
let Promise = require('./promise')

// 示例：嵌套Promise
let p = new Promise((resolve, reject) => {
  resolve(new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(100)
    }, 1000)
  }))
})

p.then(r => {
  console.log(r)
})

// -------------------------------------------------------
let Promise = require('./promise')

Promise.resolve(123).then(data => {
  console.log(data)
})