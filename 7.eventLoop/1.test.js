// while (true) {

// }

// setTimeout(() => {

// })

function a () {
  console.log('a')
  function b () {
    console.log('b')
    function c () {
      console.log('c')
    }
    c()
  }
  b()
}
a()

setTimeout(() => { // 标号 1号定时器
  console.log(1)
  Promise.resolve().then(data => {
    console.log(2)
  })
},0)

Promise.resolve().then(data => {
  console.log(3)
  setTimeout(() => {
    console.log(4)
  }, 0)
})
console.log('start') // 先执行同步代码

// start 3 1 2 4
// 执行顺序 微任务会先执行
// 给方法分类 宏任务 setTimeout > 微任务 then

// 默认先执行主栈中的代码，执行后清空微任务，之后微任务执行完毕，取出第一个宏任务到主栈中执行，(如果有微任务会再次去清空微任务)，再去取宏任务，形成了事件环
// 浏览器的事件环和node事件环有什么区别(现在是一样的) (自从node11的版本出现后，就统一了)

// 给方法 分类
// 宏任务 （setImmediate ie支持） setTimeout MessageChannel
// 微任务 then MutationObserver

// Vue.nextTick  下一个队列 (异步的)

// --------------------------------------------------

// 为什么js是单线程的？

/**
 * 多线程 （主线程） 可以同时干两件事
 * 如果浏览器是多线程，一个线程说把dom添加，另一个线程说把dom删掉，听谁的？
 * webworker 它是工作线程 它不能操作dom和window
 */