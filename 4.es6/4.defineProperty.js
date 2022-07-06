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