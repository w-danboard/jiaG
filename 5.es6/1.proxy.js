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