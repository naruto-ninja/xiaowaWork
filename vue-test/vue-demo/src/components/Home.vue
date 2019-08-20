<template>
  <div @click='changeName'> 
    {{homeData}}
    <myComponentDiv>d</myComponentDiv>
  </div>
</template>
<script>
export default {
  props: ['data'],
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