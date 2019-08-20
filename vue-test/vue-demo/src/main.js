import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

Vue.component('myComponentDiv', {
  render(createElement) {
    return createElement(
      'div',
      this.$slots.default // 子节点数组
    )
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
