// 箭头函数 没有this 没有arguments


// this的问题 看. 前面是谁 thi就是谁
let a = 1
let obj = { // 它是对象，不是作用域
  a: 2,
  fn: () => {
    setTimeout(_ => {
      console.log(this.a) // 因为箭头函数fn中没有this，所以向上找，windows没有a属性
    })
  }
}