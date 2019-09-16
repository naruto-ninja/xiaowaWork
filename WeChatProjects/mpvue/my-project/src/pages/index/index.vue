<template>
  <div class="container">
    <div v-for="(item, index) in list" v-bind:key="index">
      循环当前项是： {{item.type}}
      <single-pic 
        v-if="item.type === 'singlePic'"
      ></single-pic>
      <multiple-pic
        v-else-if="item.type === 'multiplePic'"
      ></multiple-pic>
    </div>
  </div>
</template>

<script>
import singlePic from '@/components/singlePic'
import multiplePic from '@/components/multiplePic'
export default {
  data () {
    return {
      list: []
    }
  },
  components: {
    singlePic,
    multiplePic
  },
  created () {
    mpvue.request({
      url: 'http://localhost:9000/list',
      success: ({ data }) => {
        console.log('data::', data)
        this.list = data.data
      }
    })
  }
}
</script>

<style scoped>

</style>
