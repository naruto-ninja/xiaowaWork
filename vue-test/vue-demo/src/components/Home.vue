<template>
  <div @click='changeName'> 
    {{homeData}}
    <button-counter>2</button-counter>
    <input type="text" v-focus>
  </div>
</template>
<script>
export default {
  props: ['data'],
  directives: {
    focus: {
      // 指令的定义
      inserted: function (el) {
        el.focus()
      }
    }
  },
  data() {
    return {
      homeData: this.data
    }
  },
  methods: {
    changeName() {
      this.homeData = 'handler change home component vue';
    }
  }
}
</script>