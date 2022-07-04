function Promise (executor) {
  // 给promise定义状态
  this.status = 'pending'
  // 成功和失败的原因
  this.value = undefined
  this.reason = undefined

  let self = this

  // 定义两个队列 存放对应的回调
  self.onResolveCallbacks = [] // 存放成功的回调
  self.onRejectedCallbacks = [] // 存放失败的回调

  function reoslve (value) {
    if (self.status === 'pending') {
      self.value = value
      self.status = 'fulfilled'
      self.onResolveCallbacks.forEach(fn => fn())
    }
  }

  function reject (reason) {
    if (self.status === 'pending') {
      self.reason = reason
      self.status = 'rejected'
      self.onRejectedCallbacks.forEach(fn => fn())
    }
  }

  // 执行器会立即执行
  try {
    executor(reoslve, reject)
  } catch (e) {
    // 如果报错，则调用then方法的失败方法即可
    reject(e)
  }
}

// promise2 就是当前then返回的promise
// x就是当前then中成功或者失败回调的返回结果
// 因为此方法 可能混着别人的逻辑 所以尽可能的要考虑周全
// 这个方法还要兼容别人的promise 所以要写的严谨一些
function resolvePromise (promise2, x, resolve, reject) {
  // 对x进行判断 如果x是一个普通值 直接resolve就可以了
  // 如果x是一个promise 采用x的状态
  if (promise2 === x) {
    return reject(new TypeError('循环引用'))
  }
  // 这个情况就有可能x 是一个promise了
  if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
    try {
      let then = x.then // 当前promise 有没有then方法 有可能取then的时候报错
      if (typeof then === 'function') { // 是一个promise
        // 用刚才去除的then方法 不要再取了 如果再取可能又会发生异常
        then.call(x, y => {
          resolve(y)
        }, r => {
          reject(r)
        }) 
      } else {
        resolve(x)
      }
    } catch (e) { // 这个then方法 是通过ObjectDefineProperty定义的，一取值就报错
      reject(e)
    }
  } else {
    resolve(x)
  }
}

// onfulfilled, onrejected 这两个方法必须异步执行
Promise.prototype.then = function (onfulfilled, onrejected) {
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

module.exports = Promise