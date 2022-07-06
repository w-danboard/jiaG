// ... 展开运算符

// 把两个数组合并成一个数组
// 把两个对象合并成一个对象

let arr1 = [1, 2, 3]
let arr2 = [4, 5, 6]
let arr3 = [...arr1, ...arr2]
console.log(arr3)

// ------------------------------------------------------------

// 深拷贝(拷贝后无关) 浅拷贝(拷贝后还有关)
// ...只能拷贝一层
let school = { name: 'wl' }
let my = { age: { count: 18 } }
let all = { ...school, ...my }
my.age.count = 100
console.log(all)

// ------------------------------------------------------------

// 我们可以把对象先转化成字符串，再把字符串转换成对象
// JSON.parse和JSON.stringify不支持函数、undefined。。。
// Object.assign === ...
let school = { name: 'wl', fn: function () {} }
let my = { age: { count: 18 } }
let all = JSON.parse(JSON.stringify({ ...school, ...my }))
my.age.count = 100
console.log(all)

// ------------------------------------------------------------

// 自己实现深拷贝的方法 (递归拷贝， 要一层层拷贝)
// 掌握类型判断 typeof instanceof Object.prototype.toString.call constructor
function deepClone (obj, hash = new WeakMap()) {
  // 判断obj是null还是undefined
  if (obj == null) return obj
  // 不是对象就不用拷贝了
  if (obj instanceof Date) return new Date(obj)
  if (obj instanceof RegExp) return new RegExp(obj)
  if (typeof obj === 'object') return obj
  // 要不是数组 要不是对象
  if (hash.has(obj)) return hash.get(obj) // 如果weakmap有对象，就直接返回
  // Object.prototype.toString.call(obj) === ['Object array']
  let cloneObj = new obj.constructor
  // 如果是对象，把它放到weakMap中，如果再拷贝这个对象，这个对象就存在了，直接返回这个对象即可(防止循环引用，栈溢出)
  hash.set(obj, cloneObj)
  // 实现深拷贝
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      // 如果赋予的值是对象 我就把这个对象放到weakmap中
      cloneObj[key] = deepClone(obj[key], hash)
    }
  }
  return cloneObj
}
// map weakMap set集合 map映射表
let obj = { age: 18 }
let n = deepClone(obj)
console.log(n)

// weakMap 弱链接，不会占用内存空间 map的区别 回收机制的