import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

Vue.component('button-counter', {
  render(el) {
    return el(
      'div',
      this.$slots.default
    )
  }
})

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
})
