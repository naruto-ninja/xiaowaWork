<template>
  <div class="home">
   <home-component v-bind:data="data"></home-component>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import HomeComponent from '@/components/Home.vue';

export default {
  name: 'home',
  components: {
    HomeComponent
  },
  data() {
    return { 
      data: 'this is home vue'
    }
  }
}
</script>
