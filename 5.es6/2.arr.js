// 数组的方法 es5 forEach reduce map filter some every
// es6 find findIndex
// es7 includes

// ------------------------------------------------

//  ------------------------------------------------ reduce 收敛

// 求和
let sum = [1, 2, 3, 4, 5].reduce((a, b) => {
  return a + b
})

console.log(sum)

//  ------------------------------------------------ 求和
let sum = [{ price: 100, count: 1 }, { price: 200, count: 2 }, { price: 300, count: 3 }].reduce((a, b) => {
  return a + b.price * b.count
}, 0)

console.log(sum)

//  ------------------------------------------------ reduce常见的功能 (多个数据 最终变成一个数据)
let keys = ['name', 'age']
let values = ['wl', 18] // => { name: 'wl', age: 18 }

let obj = keys.reduce((memo, current, index) => (memo[current] = values[index], memo),{})
console.log(obj)

//  ------------------------------------------------ reduce redux compose 方法 (组合多个函数)
function sum (a, b) {
  return a + b
}

function toUpper (str) {
  return str.toUpperCase()
}

function add (str) {
  return '***' + str + '***'
}

// console.log(add(toUpper(sum('name', 'wl'))))
function compose (...fns) {
  return function (...args) {
    let lastFn = fns.pop()
    return fns.reduceRight((a, b) => {
      return b(a)
    }, lastFn(...args))
  }
}
// let compose = (...fns) => (...args) => {
//   let lastFn = fns.pop()
//     return fns.reduceRight((a, b) => b(a), lastFn(...args))
// }
// 回去多想想
function compose (...fns) {
  return fns.reduce((a, b) => { // 此时返回的函数式一个通过reduce方法返回的
    console.log(a, b, '===>')
    return (...args) => {
      console.log('args', args)
      return a(b(...args))
    }
  })
}
// let compose = (...fns) => fns.reduce((a, b) => (...args) => a(b(...args)))
let r = compose(add, toUpper, sum)('name', 'wl')
console.log(r)


//  ------------------------------------------------ reduce 的实现

Array.prototype.reduce = function (callback, prev) {
  // this = [1, 2, 3]
  for (let i = 0; i < this.length; i++) {
    if (prev === undefined) {
      prev = callback(this[i], this[i + 1], i + 1, this)
      i++
    } else {
      prev = callback(prev, this[i], i, this)
    }
  }
  return prev
};

// 平均数 求幂
let r = [1, 2, 3].reduce((a, b, index, current) => {
  return a + b
}, 100)

console.log(r)

//  ------------------------------------------------ map filter some every

let arr = [1, 2, 3]
arr.map(item => item * 2) // 循环每一项 都 * 2
arr.filter(item => item !== 2) // 删除为2的 返回true表示留下
arr.some(item => item === 2)  // 看有没有等于2的，有返回true
arr.every(item => item === 1) // 看有没有不等于1的，有返回false
arr.find(item => item === 2)  // 找到返回找到的那一项，找不到返回undefined
// arr.indexOf(2) > -1 => arr.includes(2) true

