// let r = require('./sum') // fs.readFileSync() 同步读取

// console.log(r(1, 2))

// 核心模块 path
// path模块 专门用来处理文件路径的
// extname （取扩展名） 
// basename 取文件名的（但是需要扩展名） 
// join 拼接 
// resolve 解析 
// dirname 取父路径

// let path = require('path')
// console.log(path.basename('1.js', '.js'))
// console.log(path.extname('1.main.js'))
// console.log(__dirname) // 目录名 // 文件名
// console.log(__filename) // 目录名 // 文件名
// console.log(path.join(__dirname, 'sum.js'))
// console.log(path.resolve(__dirname, 'sum.js'))
// console.log(path.dirname(__dirname))

// resolve方法，可以把一个文件路径转化成绝对路径，简单说，有/用join（path.join(__dirname, 'sum.js'， ../)），没/用resolve

// -------------------------------------------------------------------

// 如何让一个字符串执行？eval / new Funciont
// eval的执行环境 是不干净的 会查找当前执行的上下文环境
// 前端模块化 是使用eval 但是node的模块化 不是用这种方式
// let name = 'zfpx'
// eval('console.log(name)')

// 请实现一个自己的模块引擎系统 ejs handlebar (靠的就是 new Funciont)
// 不能实现node模块
// let a = 'var a = 1; return x+y+e'
// 最后一个参数，是字符串，前面的参数是函数的形参
// let fn = new Function('x', 'y', 'e', a)
// console.log(fn(1, 2, 3))

// -------------------------------------------------------------------

let vm = require('vm') // 沙箱 测试环境 和外界完全隔离
let fs = require('fs')
let path = require('path')
let r = fs.readFileSync(path.resolve(__dirname, 'sum.json'), 'utf8')

console.log(r)