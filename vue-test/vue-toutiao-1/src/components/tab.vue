<template>
  <div>
    <div v-on:click="clicking">
      <span>+</span>
    </div>
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
  methods: {
      clicking() {
        this.$emit('my-event', {
          name: 'naruto'
        })
      }
    }
}
</script>   
