"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// es7语法 node并不支持 webpack
// es7或者更高的语法都转化成es5
var Animal = /*#__PURE__*/function () {
  function Animal() {
    _classCallCheck(this, Animal);

    this.name = 'xxx';
  }

  _createClass(Animal, [{
    key: "say",
    value: function say() {
      console.log('说话');
    }
  }]);

  return Animal;
}();

_defineProperty(Animal, "flag", '哺乳类');

console.log(Animal.flag); // vue-cli @vue/cli
// babel-cli => @babel/cli 默认包 模块 都不安装到全局上
// 安装本地模块 这样可以保证版本一致
// npm init
// npm install 
// npx node 5.2版本以上提供的 帮我们执行.bin 目录下的文件 如果没有这个包 它会帮我们去安装
// npm install @babel/core babel的核心包 主要就是转化代码
// npx babel 1.class.js -o es5.js
// babel-preset-es2015 主要转换es6的 但因为现在语法都es7以上了 所以这个包被废弃了
// babel-reset-stage-0 转化未定案的语法 装饰器 static
// npm install @babel/preset-env （转化已经定案的标准）
// @babel/plugin-proposal-class-properties 主要的作用是用来转化类的属性的
// babel的配置中 一半配两个 1）插件 2）预设，也就是插件的集合
