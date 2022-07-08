// 主栈执行时 默认已经超过 4ms 定时器已经到达了执行的时间
// 启动时间比较快 大于4s
setImmediate(() => {
  console.log('setImmediate')
})

setTimeout(() => {
  console.log('setTimeout')
}, 4)

process.nextTick(() => {
  console.log('nextTick')
})

// 主栈执行后会执行微任务
// 和浏览器是一样的，不一样的是，每个阶段都有一个自己的队列

let fs = require('fs')

setTimeout(() => {
  console.log('呵呵呵')
}, 1000)

// 和浏览器一样，但是在readFile中有check会先走check (check是setImmediate？？？)