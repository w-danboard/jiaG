## 默认js是(主线程)是单线程的

## 栈 和 队列
- 栈是先进后出 函数调用
- 队列是先进先出 [1, 2, 3] push() shift()

## 进程和线程的关系
- 进程是计算机分配任务 和调度任务的基本单位
- js中一个进程里 只有一个主线程
- js线程和ui线程是互斥的 一个主线程中 不能同事进行渲染ui和js
- 如何提高js的加载速度 defer（异步加载js，并且按顺序执行） / async (不能保证执行顺序，如果两个js随便哪个先执行可以使用async)
- prefecth(把路由拆分,默认不会马上加载，等待浏览器空闲的时候偷偷的加载) / preload(会先加载资源) 

mdn资料