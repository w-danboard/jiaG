// lodash debounce throttle

function after (times, callback) {
  return function () {
    if (--times === 0) {
      callback() // Promise.all原理
    }
  }
}

let newFn = after(3, function () { // 高阶函数
  console.log('after')
})

newFn()
newFn()
newFn()