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