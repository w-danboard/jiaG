// var 要求全部改成let或者const
// var 污染全局变量
// var 导致变量提升


// 1）var 污染全局变量
var a = 1
console.log(a) 

// 2）var 导致变量提升
console.log(a)
var a = 1

// 3) var 可以被重复声明，let可以解决重复定义的问题
var a = 1
var a = 2
var a = 3

// 4) let 作用域的问题 （常见的作用域有两个，1.全局作用域 2.函数作用域）
let a = 100
{
  console.log(a) // 暂存死区
  let a = 200 
}

// 5) const 常量 不会变的量 （地址不变即可）
const PI = 3.14