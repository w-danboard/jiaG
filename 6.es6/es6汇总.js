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

// ------------------------------------------------------------

// set / map 是两种存储结构

// set是集合 不能放重复的东西 放了就白放了 可以用数组去重
let s = new Set([1, 2, 3, 4, 5, 3])
s.add(111)    // 添加
s.delete(2) // 删除
console.log([...s]) // 基础类型 string number boolean undefined object symbol


// ----------------------------------------------------

// 集合 并集 交集 差集
let s01 = [1, 2, 3, 1, 2]
let s02 = [3, 4, 5, 1, 2]

function union () {
  let s1 = new Set(s01)
  let s2 = new Set(s02)
  console.log([...new Set([...s1, ...s2])])
}
union()

// 交集：两个集合共有的元素
function intersection () {
  // 返回 ture 表示留下
  return [...new Set(s01)].filter(item => {
    return new Set(s02).has(item)
  })
}
console.log(intersection())

// 差集：谁比谁多的差异
function diff () {
  // 返回 ture 表示留下
  return [...new Set(s02)].filter(item => {
    return !new Set(s01).has(item)
  })
}
console.log(diff())

// ----------------------------------------------------

// map是有key的  不能仿重复的
let m = new Map()
m.set('name', 'wl')
let obj = { name: 1 }
m.set(obj, '456') // 这个obj的引用的空间被set所引用
obj = null  // 把obj清空，这个空间实际还是在的
console.log(m)

// ----------------------------------------------------

// WeakMap弱链接
let m = new WeakMap() // WeakMap 的key 必须是对象类型
let obj = { name: 1 }
m.set(obj, '456') // 这个obj的引用的空间被set所引用
obj = null  // 把obj清空，这个空间实际还是在的
console.log(m)

// v8引起的垃圾回收

// ----------------------------------------------------

// Obejct.defineProperty es5 vue

// 通过Obejct.defineProperty定义属性 可以增加拦截器

let obj = {}
let other = ''

// 默认定义的属性是不可枚举的 不可枚举就是不可以 for in ...(如：函数的原型就不可枚举的 Array.prototype)
Object.defineProperty(obj, 'name', {
  enumerable: true, // 可枚举
  configurable: true, // 是否可以删除这个属性
  // writable: true, // 是否可以重写
  get () {
    return other
  },
  set (val) {
    other = val
  }
})

obj.name = 'world'
console.log(obj.name)

// ----------------------------------------------------

// 对象的setter和getter
let obj = {
  other: '',
  get name () {
    return this.other
  },
  set name (val) {
    this.other = val
  }
}

obj.name = 456
console.log(obj.name)

// ----------------------------------------------------

// vue的数据劫持 (把所有的属性都改成 get和set方法)

// 模拟的更新方法
function update () {
  console.log('更新视图')
}

let data = {
  name: 'wl',
  age: 18,
  address: {
    location: '回龙观'
  }
}

// Object.defineProperty只能用在对象上 (数组也不识别)
function observer (obj) {
  if (typeof obj !== 'object') return obj
  for (let key in obj) {
    defineReactive(obj, key, obj[key])
  }
}

// 定义响应式
function defineReactive (obj, key, value) {
  observer(value)
  Object.defineProperty(obj, key, {
    get () {
      return value
    },
    set (val) {
      if (val !== value) {
        observer(val)
        update()
        value = val
      }
    }
  })
}

observer(data)
data.address = [1, 2, 3]

let methods =  ['push', 'slice', 'pop', 'sort', 'reverse', 'unshift']
methods.forEach(method => {
  // 面向切片开发 装饰器
  let oldMethod = Array.prototype[method]
  Array.prototype[method] = function () {
    console.log(method, '===>')
    // update()
    oldMethod.call(this, ...arguments)
  }
})


data.address.push(111)

// ----------------------------------------------------

Vue.prototype.$set = function (obj, key, callback) {
  Object.defineProperty(obj, key, {
    get: callback
  })
}

// ----------------------------------------------------

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

// ----------------------------------------------------

// Object.defineProperty 不支持数组的更新 push slice...
// 希望数组变化就能根性视图


function update () {
  console.log('更新视图')
}

let arr = [1, 2, 3]
// proxy可以监控到数组的变化和对象的变化
// 数组变化 会先改变数组的内容 还会改变数组的长度
let proxy = new Proxy(arr, {
  set (target, key, value) {
    // Reflect反射的意思，往里面放值就反射到原数组上，就不需要手动操作了
    // 因为数组变化时，可能调用的是push方法，这个时候key就会出现问题
    if (key === 'length') return true
    update()
    return Reflect.set(target, key, value) // 同target[key] = value，只是不许关心长度了
    // if (key === 'length') return true
    // update()
    // target[key] = value
  },
  get (target, key) {
    return Reflect.get(target, key)
  }
})

// proxy[0] = 100
proxy.push(200)
console.log(proxy[0])

// ----------------------------------------------------

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

// ----------------------------------------------------

// es6 类 es5 构造函数

// ---------------------------------------------------- 1.了解构造函数的属性

function Animal (name) {
  // 属性 分为两种 1）实例上的属性 2）原型上的属性，公有属性
  this.name = name
  this.arr = [1, 2, 3]
}

Animal.prototype.address = { location: '山里' }

let a1 = new Animal('猴子')
let a2 = new Animal('小鸡')
console.log(a1.arr === a2.arr)
console.log(a1.address === a2.address)
// 每个实例都有一个__proto__ 指向所属类的原型
console.log(a1.__proto__ === Animal.prototype)
console.log(a1.constructor === Animal)

console.log(Animal.__proto__ === Function.prototype)
console.log(a1.__proto__.__proto__ === Object.prototype)
console.log(Object.prototype.__proto__ === null)

// ---------------------------------------------------- 2.类的继承

function Animal (name) {
  // 属性 分为两种 1）实例上的属性 2）原型上的属性，公有属性
  this.name = name
  this.eat = '吃肉'
}

Animal.prototype.address = { location: '山里' }

function Tiger (name) {
  this.name = name
  this.age = 10
  Animal.call(this)
}

// 继承父类上的属性、方法
// Tiger.prototype.__proto__ = Animal.prototype // IE没有__proto__ 可以用这个方法代替 等价于 Object.setPrototypeOf(Tiger.prototype, Animal.prototype) // ES7
// function create (parentPrototype) {
//   let Fn = function () {}
//   Fn.prototype = parentPrototype // 当前函数的原型 只有父类的原型
//   return new Fn() // 当前实例可以拿到 animal.prototype
// }
Tiger.prototype = Object.create(Animal.prototype, { constructor: { value: Tiger } })
Tiger.prototype.say = function () {
  console.log('说话')
}


// 1) 继承父类实例上的属性
let tiger = new Tiger()
console.log(tiger.address)

// 我们写的时候 call + Object.create / call + setPrototypeOf

// ----------------------------------------------------

class Animal {
  // static flag = 123 // es7写法
  // es7支持静态属性，es6只支持静态方法
  static flag () {
    return 123
  }
  constructor (name) {
    this.name = name
    this.eat = '吃肉'
  }
  // 原型上的方法
  say () {
    console.log('say') // es6规范，如果单独调用原型上的方法 this是不存在的
  }
}

// 1）类不能当做函数调用
let animal = new Animal()
// console.log(animal.say())
// console.log(Animal.flag())

class Tiger extends Animal { // 实例 + 原型
  constructor (name) { // Animal.call(this)
    super()
    this.name = `---${name}---`
  }
}

let tiger = new Tiger('王老虎')
console.log(tiger.name)
console.log(Tiger.flag()) // 静态方法也是可以被继承的

// ----------------------------------------------------

// vue-cli @vue/cli
// babel-cli => @babel/cli 默认包 模块 都不安装到全局上
// 安装本地模块 这样可以保证版本一致
// npm init
// npm install 
// npx node 5.2版本以上提供的 帮我们执行.bin 目录下的文件 如果没有这个包 它会帮我们去安装
// npm install @babel/core babel的核心包 主要就是转化代码
// npx babel 1.class.js -o es5.js
// babel-preset-es2015 主要转换es6的 但因为现在语法都es7以上了 所以这个包被废弃了
// babel-reset-stage-0 转化未定案的语法 装饰器 static
// npm install @babel/preset-env （转化已经定案的标准）
// @babel/plugin-proposal-class-properties 主要的作用是用来转化类的属性的
// babel的配置中 一般配两个 1）插件 2）预设，也就是插件的集合

// 装饰器可以修饰类 类的属性 类的原型上的方法
// 修饰的时候 就是把这个类 属性... 传递给修饰的函数

// @flag
@flag('哺乳类')
class Animal {
  @readonly
  PI = 3.14
  @readonly
  name = 'xxx'
  @before
  say () {
    console.log('说话')
  }
}

// 1）类的静态属性
// function flag () {
//   consructor.type = '哺乳类'
// }
function flag (value) {
  return function (consructor) {
    consructor.type = value
  }
}
console.log(Animal.type)

// 2) 类的属性 (实例上的属性)
function readonly (target, property, descriptor) {
  descriptor.writable = false
  setTimeout(() => {
    console.log(target == Animal.prototype) // 类的原型
  }) 
}

let animal = new Animal()
animal.PI = 3.15

function before (target, property, descriptor) {
  let oldSay = descriptor.value
  descriptor.value = function () {
    console.log('before')
    oldSay.call(target, ...arguments)
  }
}

animal.say()