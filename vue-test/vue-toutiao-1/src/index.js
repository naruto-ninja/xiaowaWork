/** 
 * @file 入口文件
 * @auth naruto
 * */

import Vue from  'vue';
// import VueRouter from 'vue-router';
import VueRouter from './vue-fake-router.js';

// 自定义插件
import plugins from './utils';

// 业务组件
import Main from './pages/main.vue';
import Setting from './pages/setting.vue';
import Detail from './pages/detail.vue';
import Video from './components/video.vue';

Vue.use(VueRouter);
Vue.use(plugins);

const routes = [
  {
    path: '/page',
    component: Main
  }, {
    path: '/setting',
    component: Setting
  }, {
    path: '/detail/:id',
    component: Detail,
    props: true,
    children: [
      {
        path: 'video',
        component: Video
      }
    ]
  }
]

const router = new VueRouter({
  routes,
  // mode: 'history'
})

const vm = new Vue({
  el: '#app',
  router,
  render(createElement) {
    // 拿到当前路径下对应的component
    return createElement('router-view');
}
})
