// rollup默认可以导出一个对象，作为打包的配置文件
import babel from 'rollup-plugin-babel'
export default {
  input: './src/index.js', // 入口
  output: {
    file: './dist/vue.js', // 出口
    name: 'Vue',
    format: 'umd', // 常见的打包格式 esm es6模块 commonJS模块 iife自执行函数 umd(支持commonJS和amd)
    sourcemap: true // 希望可以调试源代码
  },
  plugins: [
    babel({
      exclude: 'node_modules/**' // 排除node_modules所有文件
    })
  ]
}

// 为什么vue2只能支持ie9以上? 因为Object.defineProperty不支持低版本的
// proxy是es6的，也没有替代方案