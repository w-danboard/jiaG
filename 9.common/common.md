require
mod.require
Module._load 模块的加载
Model._resolveFilename 解析文件的名字 获取文件的绝对路径
Model._cache 做一个模块的缓存 没有缓存就创建模块
new Module(filename, parent) 没有模块就创建一个模块 id=文件名, exports当前的{}
Module._cache[filename] = module  把模块缓存起来
tryModuleLoad 尝试加载模块
module.load 加载模块
Module._extensions 获取扩展名 加载模块 对象 .js .json
module.compile 给模块添加闭包
Module.warp 包裹