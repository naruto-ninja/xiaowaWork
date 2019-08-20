<template>
  <div>
    <!-- <div>
      <span>推荐</span>
      <span>热点</span>
      <span>农业 </span>
    </div>
    <div> 
      <slot></slot>
    </div> -->
    <div>
      <slot name='header'></slot>
    </div>
    <div>
      <slot name='content'></slot>
    </div>
  </div>
</template>
<script>
export default {
  
}
</script>   
