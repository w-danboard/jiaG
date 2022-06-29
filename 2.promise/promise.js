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

Promise.prototype.then = function (onfulfilled, onrejected) {
  let self = this
  // 如果状态是成功 则调用成功的回调
  if (self.status === 'fulfilled') {
    onfulfilled(self.value)
  }
  // 如果状态是失败 则调用失败的回调
  if (self.status === 'rejected') {
    onrejected(self.reason)
  }
  // 如果状态是等待 
  // 如果是异步的时候，需要把成功和失败分别存放到数组里[发布订阅]
  // 如果稍后调用了resolve 会让函数依次执行 执行的时候 会将成功或者失败的值进行传递
  if (self.status === 'pending') {
    this.onResolveCallbacks.push(function () {
      onfulfilled(self.value)
    })
    this.onRejectedCallbacks.push(function () {
      onrejected(self.reason)
    })
  }
}

module.exports = Promise