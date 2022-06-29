// 并发调用接口 两个ajax ajax1 => name ajax2 => age = name + age

let fs = require('fs') // fileSystem

function after (times, callback) {
  let result = {}
  return function (key, data) {
    result[key] = data
    if (--times === 0) {
      callback(result)
    }
  }
}

let newFn = after(2, function (result) { // 这个方法会在所有异步执行后执行
  console.log(result)
})

fs.readFile('./name.txt', 'utf8', function (err, data) {
  if (err) return console.log(err)
  newFn('name', data)
})

fs.readFile('./age.txt', 'utf8', function (err, data) {
  if (err) return console.log(err)
  newFn('age', data)
})

// 串行 两个人有关系 上一个人的输出是下一个人的输入
// 并行 两个人没关系 可以一起执行


// 前端面试中 发布订阅 (promise原理) 观察者模式 (观察者模式里，包括的发布订阅)