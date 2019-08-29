<template>
  <div>
    详情页面{{this.$route.params.id}} ||| {{id}}
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  props: ['id'],
}
</script>  
