<template>
  <div>
    <div v-for="item in innerTabs" class="item" v-bind:key="item.key">
      {{item.titel}}
    </div>
  </div>
</template>
<script>
  export default {
    props: ['tabs']
  }
</script>>