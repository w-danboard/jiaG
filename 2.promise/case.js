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

// -------------------------------------------------------
let Promise = require('./promise')

// Promise.all Promise.race promisify
let fs = require('fs')
function read (url) {
  return new Promise((resolve, reject) => {
    fs.readFile(url, 'utf8', (err, data) => {
      if (err) return reject(err)
      resolve(data)
    })
  })
}

// Promise.all的原理
Promise.all = function (values) {
  return new Promise((resolve, reject) => {
    let arr = []
    let count = 0
    function processData (key, value) {
      arr[key] = value // 将结果和数据对应起来
      if (++count === values.length) {
        resolve(arr) // 成功后 把结果抛出来
      }
    }
    for (let i = 0; i < values.length; i++) {
      let current = values[i]
      let then = current.then
      // 是一个promise
      if (then && typeof then === 'function') { // 是一个promise
        then.call(current, y => { // 是promise的就让promise执行
          processData(i, y)
        }, reject) // 如果其中一个promise出错 就停止执行
      } else {
        processData(i, current) // 常量直接返回即可
      }
    }
  })
}

Promise.all([read('./name.txt'), read('./age.txt'), 1, 2, 3]).then(data => {
  console.log(data)
}).catch(err => {
  console.log('err', err)
})

// -------------------------------------------------------
let Promise = require('./promise')

// Promise.all Promise.race promisify
let fs = require('fs')
// node中的所有方法 都是错误优先 第二个就是结果 bluebird

function promisify (fn) { // 把方法promise化
  return function (...args) { // ['name.txt', 'utf8']
    return new Promise((resolve, reject) => {
      fn(...args, function (err, data) {
        if (err) reject(err)
        resolve(data)
      })
    })
  }
}

let read = promisify(fs.readFile)

function promisifyAll (obj) {
  for (let key in obj) { // 遍历整个对象 如果是函数 就把方法重写
    if (typeof obj[key] === 'function') {}
    obj[key + 'Async'] = promisify(obj[key]) // 每个方法都promise化
  }
}

promisifyAll(fs)

fs.readFileAsync('./name.txt', 'utf8').then(data => {
  console.log(data)
})


// function read (url) {
//   return new Promise((resolve, reject) => {
//     fs.readFile(url, 'utf8', (err, data) => {
//       if (err) return reject(err)
//       resolve(data)
//     })
//   })
// }

// function write (url) {
//   return new Promise((resolve, reject) => {
//     fs.writeFile(url, 'utf8', (err, data) => {
//       if (err) return reject(err)
//       resolve(data)
//     })
//   })
// }

// Promise.race的原理 (race赛跑的意思)
Promise.race = function (values) {
  return new Promise((resolve, reject) => {
    for (let i = 0; i < values.length; i++) {
      let current = values[i]
      let then = current.then
      // 是一个promise
      if (then && typeof then === 'function') { // 是一个promise
        then.call(current, y => { // 是promise的就让promise执行
          resolve(y)
        }, reject) // 如果其中一个promise出错 就停止执行
      } else {
        resolve(current)
        break
      }
    }
  })
}

Promise.race([read('./name.txt'), read('./age.txt'), 1, 2, 3]).then(data => {
  console.log(data)
}).catch(err => {
  console.log('err', err)
})