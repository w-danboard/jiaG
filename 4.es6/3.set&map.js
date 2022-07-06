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

