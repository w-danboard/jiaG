## 进程和线程的区别

一个进程中可以有多个线程，比如渲染线程、JS引擎线程、HTTP请求线程等等

- 多线程在单核cpu中，其实也是顺序执行的，不过系统可以帮你切换那个执行而已，没有提高速度
- 多个cpu的话就可以在多个cpu中同时执行