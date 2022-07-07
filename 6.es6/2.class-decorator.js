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