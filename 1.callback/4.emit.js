let fs = require('fs')

// 发布 订阅 [fn, fn]
function EventEmitter () {
  this._arr = []
}

EventEmitter.prototype.on = function (callback) { // 订阅
  this._arr.push(callback)
}

EventEmitter.prototype.emit = function () { // 发布 发布时 需要让on的方法依次执行
  this._arr.forEach(fn => fn.apply(this, arguments))
}

let school = {}
let e = new EventEmitter()
e.on(function (data, key) {
  school[key] = data
  if (Object.keys(school).length === 2) {
    console.log(school)
  }
})
e.on(function() {
  console.log('一次接口成功了')
})

fs.readFile('./name.txt', 'utf8', function (err, data) {
  if (err) return console.log(err)
  e.emit(data, 'name')
})

fs.readFile('./age.txt', 'utf8', function (err, data) {
  if (err) return console.log(err)
  e.emit(data, 'age')
})