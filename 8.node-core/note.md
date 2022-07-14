
## node中间层
- 解决跨域问题（跨域是浏览器的问题） (协议 ip 端口号)

---

## node能解决什么问题？
- node的首要目标是提供一种简单的，用于创建高性能服务器的开发工具
- web服务器的瓶颈在与并发的用户量，对比java和php的实现方式

---

## java 多线程语言
- tomcat、iis

---

## node 适合并发搞的web （主要是读取文件）
- node适合i/o密集型 readFile libuv
- 不适合cpu密集 (运算 加密 解密)
- nginx （如果只想解决并发问题，使用nginx）
- nginx 开发进程 =》node => java

---

## node是什么？
- node是一个基于Chrome V8引擎的javaScript运行环境，让javaScript的执行效率与低端的C语言的相近的执行效率
- node使用了一个事件驱动、非阻塞式I/O的模型，使其轻量又高效
- node的宝管理器npm，是全球最大的开源库生态系统 (生态好，适合做一些前端的开发工具 webpack gulp)

---

## i/o 异步/同步 阻塞/非阻塞
- 内核v8 基于libuv库 多线程（可以实现异步）
- v8引擎中的方法setTimeout 不能操作dom 因为服务端没有dom bom 只有ecmascript，它为了拥有服务端的能力，内置了很多模块 fs http...

## 异步/同步 阻塞/非阻塞
- 异步/同步,指的是被调用方 fs.readFile
- 阻塞/非阻塞,指的是调用方

- 同步阻塞
- 异步非阻塞 (node)

---

## 什么场合下应该考虑使用node框架
> 当应用程序需要处理大量并发的输入输出，而在向客户端响应之前，应用程序并不需要进行非常负责的处理。
- 聊天服务器
- 电子商务网站

## node的方法过一下