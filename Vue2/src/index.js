// Vue这个构造函数，没有采用class类的方式，因为class会将所有的方法都耦合在一起

import { initMixin } from './init'

function Vue (options) { // options就是用户的选项
  this._init(options)
}

initMixin(Vue)

export default Vue