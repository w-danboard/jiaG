/**
 * Promise有三个状态: pending | fulfilled | rejected
 *  状态可以从pending变成成功，也可以从pending变成失败 (只有状态是pending的时候，才能改为成功态或失败态)
 *  要把成功的值和失败的值都保留在实例的value | reason中, 为了给then方法传参
 *  调用成功的时候会调用resolve方法，调用失败的时候会调用reject方法，这两个函数都是没有返回值的
 *  每个promise必须返回一个新的状态，保证可以链式调用
 */
function Promise (executor) {
  // 给promise定义状态
  this.status = 'pending'
  // 成功和失败的原因
  this.value = undefined
  this.reason = undefined

  let self = this

  // 定义两个队列 存放对应的回调
  self.onResolveCallbacks = []  // 存放成功的回调
  self.onRejectedCallbacks = [] // 存放失败的回调

  // 变成成功态
  function resolve (value) {
    // 示例：嵌套Promise
    // 说明value是Primise
    if (value instanceof Promise) {
      return value.then(resolve, reject)
    }
    // if (value !== null && (typeof value === 'object' || typeof value === 'function' )) {
    //   if (value.then && typeof value.then === 'function') {}
    //   return value.then(resolve, reject)
    // }
    if (self.status === 'pending') {
      self.value = value
      self.status = 'fulfilled'
      self.onResolveCallbacks.forEach(fn => fn())
    }
  }

  // 变成失败态
  function reject (reason) {
    if (self.status === 'pending') {
      self.reason = reason
      self.status = 'rejected'
      self.onRejectedCallbacks.forEach(fn => fn())
    }
  }

  try {
    // 执行器会立即执行
    executor(resolve, reject)
  } catch (e) {
    // 如果报错，则调用then方法的失败方法即可
    reject(e)
  }
}

// promise2 就是当前then返回的promise
// x就是当前then中成功或者失败回调的返回结果
// 因为此方法 可能混着别人的逻辑 所以尽可能的要考虑周全
// 这个方法还要兼容别人的promise 所以要写的严谨一些 如es6Promise
// 
function resolvePromise (promise2, x, resolve, reject) {
  // 对x进行判断 如果x是一个普通值 直接resolve就可以了
  // 如果x是一个promise 采用x的状态
  // 防止返回的promise和then方法返回的promise是一个
  if (promise2 === x) {
    return reject(new TypeError('循环引用'))
  }
  // 这个情况就有可能x 是一个promise了
  if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
    let called // 标识由等待态变成功态或失败态，一旦成功就不可失败，一旦失败就不可成功
    try {
      let then = x.then // 当前promise 有没有then方法 有可能取then的时候报错
      if (typeof then === 'function') { // 是一个promise
        // 用刚才去除的then方法 不要再取了 如果再取可能又会发生异常
        then.call(x, y => {
          if (called) return
          called = true
          // resolve(y) y有可能还是promise,看示例promise3
          // 如果返回的是一个promise，这个promise的resolve结果可能还是promise，所以递归解析，直到y是常量未知
          resolvePromise(promise2, y, resolve, reject)
        }, r => {
          if (called) return
          called = true
          reject(r)
        }) 
      } else {
        resolve(x) // { then: undefined } 常量不会再次调
      }
    } catch (e) { // 这个then方法 是通过ObjectDefineProperty定义的，一取值就报错
      if (called) return // 这个判断为了防止出错后又调用成功逻辑
      called = true
      reject(e)
    }
  } else {
    resolve(x) // x就是普通常量
  }
}

// onfulfilled, onrejected 这两个方法必须异步执行
Promise.prototype.then = function (onfulfilled, onrejected) {
  // 此处处理，同下多行注释
  onfulfilled = typeof onfulfilled === 'function' ? onfulfilled : val => val
  /**
   * onrejected = typeof onrejected === 'function' ? onrejected : err => { throw err } 兼容如下使用方式
   * p.then().then().then().then(null, function (err) { 值得穿透
   *   console.log(err, '---')
   * })
   */
  onrejected = typeof onrejected === 'function' ? onrejected : err => { throw err }
  let self = this
  // 返回新的promise 让当前的then方法执行后可以继续then
  let promise2 = new Promise(function (resolve, reject) {
    // 如果状态是成功 则调用成功的回调
    if (self.status === 'fulfilled') {
      setTimeout(_ => {
        try {
          let x = onfulfilled(self.value)
          resolvePromise(promise2, x, resolve, reject)
        } catch (e) {
          reject(e)
        }
      })
    }
    // 如果状态是失败 则调用失败的回调
    if (self.status === 'rejected') {
      setTimeout(_ => {
        try {
          let x = onrejected(self.reason)
          resolvePromise(promise2, x, resolve, reject)
        } catch (e) {
          reject(e)
        }
      })
    }
    // 如果状态是等待 
    // 如果是异步的时候，需要把成功和失败分别存放到数组里[发布订阅]
    // 如果稍后调用了resolve 会让函数依次执行 执行的时候 会将成功或者失败的值进行传递
    if (self.status === 'pending') {
      self.onResolveCallbacks.push(function () {
        setTimeout(_ => {
          try {
            let x = onfulfilled(self.value)
            resolvePromise(promise2, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        })
      })
      self.onRejectedCallbacks.push(function () {
        setTimeout(_ => {
          try {
            let x = onrejected(self.reason)
            resolvePromise(promise2, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        })
      })
    }
  })
  return promise2
}

// catch 是then的简写 同示例：catch
Promise.prototype.catch = function (errCallback) {
  return this.then(null, errCallback)
}

// 上来就创建一个成功的Promise 简写
Promise.resolve = function (value) {
  return new Promise((resolve, reject) => {
    resolve(value)
  })
}

// 上来就创建一个失败的Promise 简写
Promise.reject = function (reason) {
  return new Promise((resolve, reason) => {
    reason(reason)
  })
}

// 测试自己写的promise是否符合规范
// npm install promises-aplus-tests -g
// promises-aplus-tests promise.js
// 扩展: 比如面试问，请实现一个延迟对象，像Promise.deferred就是一个延迟对象
Promise.deferred = function () {
  let dfd = {}
  dfd.promise = new Promise((resolve, reject) => {
    dfd.resolve = resolve
    dfd.reject = reject
  })
  return dfd
}

module.exports = Promise