function Promise (executor) {
  // 给promise定义状态
  this.status = 'pending'
  // 成功和失败的原因
  this.value = undefined
  this.reason = undefined

  let self = this

  function reoslve (value) {
    if (self.status === 'pending') {
      self.value = value
      self.status = 'fulfilled'
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
}

module.exports = Promise