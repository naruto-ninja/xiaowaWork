<template>
  <div class="home">
   <home-component v-bind:data="data"></home-component>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import HomeComponent from '@/components/Home.vue';
import { mixin } from '@/utils.js'

export default {
  name: 'home',
  mixins: [mixin],
  components: {
    HomeComponent
  },
  created: function () {
    console.log(this.$data)
    // => { message: "goodbye", foo: "abc", bar: "def" }
  },
  data() {
    return { 
      data: 'this is home vue'
    }
  }
}
</script>
