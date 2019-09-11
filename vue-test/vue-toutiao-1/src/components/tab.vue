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
        console.log('this.$slot.default::', this.$slots.header, this.$children)
        this.$emit('my-event', {
          name: 'naruto'
        })
      }
    }
}
</script>   
