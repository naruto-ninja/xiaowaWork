/** 
 * @file 入口文件
 * @auth naruto
 * */

import Vue from  'vue';
import Main from './pages/main.vue';
// 自定义插件
import plugins from './utils';

Vue.use(plugins)

const vm = new Vue({
  el: '#app',
  render: h => h(Main)
})
