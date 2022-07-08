// node是js的执行环境
// 执行node的方式 node 文件名可以执行

// 浏览器里的window = this node中 global = this
// 在文件中执行 this指向的不是global

// node为了实现模块化 在文件执行时 增加了一个匿名函数 所以this在这个函数中被更改了
// console.log(this) // {} module.exports

// 在浏览器中可以直接访问window, 浏览器中不能访问global, window代理了global
// 在服务端可以直接访问global上的属性
// console.log(Object.keys(global))
// process 进程 当前的执行环境
// Buffer 可以读写文件 内存中 Buffer
// setImmediate 宏任务
// setTimeout setInterval
// 默认把v8引擎上的方法 给隐藏掉了 eval decodeURICompnent
// console.dir(global, {showHidden: true})

// ------------------------------------------------------------- process

// global的属性可以直接被访问
// console.log(Object.keys(process))

// ------------------------------------------------------------------------
// argv 运行时传递的参数 (可以在node运行时 传入特定的一些变量)
let obj = process.argv.slice(2).reduce((memo, b, index, arr) => {
  if (b.includes('--')) { // --config xxx --port xxx
    memo[b.slice(2)] = arr[index + 1] // 如果有--就是key 下一项就是值
  }
  return memo
}, {})
console.log(obj)

// ------------------------------------------------------------------------
// env 环境变量 (在当前运行的命令行中 可以设置一个变量 set NODE_ENV=devlopment | export NODE_ENV=DEVLOPMENT)
// 可以根据不同的环境变量 调用不同的接口
console.log(process.env.NODE_ENV)
if (process.env.NODE_ENV === 'devlopment') {
  console.log('开发环境')
} else {
  console.log('生产环境')
}

// ------------------------------------------------------------------------
// cwd 当前的工作目录 (比如说我们的node运行的地点)
console.log(process.cwd()) // http-server （通过cwd可以知道在哪里运行的node服务）

// ------------------------------------------------------------------------
// nextTick （微任务）只能在node里用
// node的事件环，它是每一个方法都有一个队列
// 宏任务 setImmediate setTimeout readFile
// promise.then nextTick

// ------------------------------------------------------------------------
// stdin stderr stdout