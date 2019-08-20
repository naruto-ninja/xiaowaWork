<template>
  <div>
    
      <tab>
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
      </tab>
  </div>
</template>
<script>

import * as components from '../items';
import tab from '../components/tab.vue';

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
    Agriculture: () => import(/* webpackChunkName: 'agriculture' */ '../items/agriculture.vue') 
  },

  data() {
    return {
      list: [],
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
        this.list = data;
      })
  },

  methods: {
    onReachBottom() {
      console.log('加载')
    }
  }
}
</script>  
