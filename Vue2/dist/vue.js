(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Vue = factory());
})(this, (function () { 'use strict';

  // 给Vue增加init方法的
  function initMixin(Vue) {
    // 用于初始化操作
    Vue.prototype._init = function (options) {
      // vue vm.$options 就是获取用户的配置
      // 我们使用 vue 的时候，$nextTick $data $attr
      var vm = this;
      vm.$options = options; // 将用户的选项挂载到实例上
      // 初始化状态

      initState(vm); // todo...
    };
  }

  // Vue这个构造函数，没有采用class类的方式，因为class会将所有的方法都耦合在一起

  function Vue(options) {
    // options就是用户的选项
    this._init(options);
  }

  initMixin(Vue);

  return Vue;

}));
//# sourceMappingURL=vue.js.map
