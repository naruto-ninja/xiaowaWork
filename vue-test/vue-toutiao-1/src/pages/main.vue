<template>
  <div>
      <component 
        v-bind:is="page"
        v-on:my-event="showMoreTab"
      >
        <template v-slot:header>
          <div>
            <span>推荐</span>
            <span>热点</span>
            <span>农业 </span>
          </div>
        </template>
       <template v-slot:content>
          <div v-for="(item, index) in list" v-bind:key="index">
            <!-- 动态组件 -->
            <component 
              v-bind:is="item.type | formatComponentName" 
              v-bind='item.data'
            >
            </component> 
          </div>
       </template>
      </component>
  </div>
</template>
<script>

import * as components from '../items';
import tab from '../components/tab.vue';
import setting from './setting.vue';

const converModule2Obj = muduleObj => {
  let result = {}
  for(let muduleName in muduleObj) {
    result[muduleName] = muduleObj[muduleName]
  }
  return result;
}

export default {
  components: {
    ...converModule2Obj(components), 
    tab, 
    // 异步组件
    Agriculture: () => import(/* webpackChunkName: 'agriculture' */ '../items/agriculture.vue') ,
    setting
  },

  data() {
    return {
      list: [],
      page: 'tab',
      curTab: 'agriculture',
    }
  },

  filters: {
    formatComponentName(componentName) {
      return componentName.replace(/^\w/g, name => name.toUpperCase())
    }
  },

  created() {
     // agriculture __all__
    fetch('/list?tab=agriculture')
      .then(res => res.json())
      .then(({data}) => {
        console.log('data::', data);
        this.list = data;
      })
  },

  methods: {
    onReachBottom() {
      console.log('加载')
    },
    showMoreTab(event) {
      // console.log('showMoreTab event::', event);
      if (event === 'hide') {
          this.page = 'tab';
        } else {
          // window.location.hash = '#/setting'
          this.$router.push('/setting');
          // this.page = 'setting';
        }
      }
  }
}
</script>  
