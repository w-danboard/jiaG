function * read () { // 生成器会配合yield来使用, 如果碰到yield会暂停执行
  yield 1
  yield 2
  yield 3
}

// 生成器返回的是迭代器 迭代器有next方法 调用next可以返回 value和done
let it = read()
console.log(it.next())
console.log(it.next())
console.log(it.next())
console.log(it.next())
console.log(it.next())

// ------------------------------------------------------------------------

// async + await es7 => generator + co

let fs = require('mz/sf')

function * read () {
  let r = yield fs.readFile('./name.txt', 'utf8')
  let age = yield fs.readFile(r, 'utf8')
  let e = yield 1 + age
  return e
}

// let it = read()

// let { value, done } = it.next() // 1. value = r
// Promise.resolve(value.then(data => {
//   let { value, done } = it.next(data) // 2. data = age.txt
//   Promise.resolve(value).then(data => { 
//     let { value, done } = it.next(data) // 3. data = 18
//     Promise.resolve(value).then(data => {
//       console.log(data) // 4. 1 + 18
//     })
//   })
// }))

// ------------------------------------------------------------------------

// async + await es7 => generator + co

let co = require('co')
co(read()).then(data => {
  console.log(data)
})

// ------------------------------------------------------------------------ 华丽的分割线 ----------------------

function * read () {
  let r = yield Promise.resolve(1)
  let age = yield Promise.resolve(1 + r)
  let e = yield [age]
  return e
}

// co库的核心
function co (it) {
  return new Promise((resolve, reject) => {
    function next (val) {
      let { value, done } = it.next(val)
      if (done) {
        return resolve(value)
      }
      // 如果不是promise 把他包装成promise
      Promise.resolve(value).then(data => {
        next(data)
      }, reject)
    }
    next()
  })
}

co(read()).then(data => {
  console.log(data)
}).catch(e => {
  console.log('err', e)
})