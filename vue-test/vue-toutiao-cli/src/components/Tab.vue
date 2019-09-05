<template>
  <div>
    <div v-for="item in convertedTabs" class="item" v-bind:key="item.unit">
      {{item.titel}}
    </div>
  </div>
</template>
<script>
  import {convert} from '../utils';
  export default {
    props: ['tabs'],
    computed: {
      convertedTabs() {
        return convert(this.tabs);
      }
    }
  }
</script>