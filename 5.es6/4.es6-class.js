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