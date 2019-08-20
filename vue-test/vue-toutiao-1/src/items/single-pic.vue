<template>
  <div class="item single-pic" v-on:click='changeName'>
      <div class="content">
          <span>
             {{title}}
          </span>
      </div>
      <img v-bind:src="imgUrl" />
  </div>

 
</template>

<script>
export default {
    props: ['title', 'imageList'],

    computed: {
      imgUrl() {
        return this.imageList[0]
      }
    },

    methods: {
      changeName() {
        this.title = 'aaaaaa'
      }
    }
}
</script>
<style scoped>
@import './index.css';

  .item.single-pic {
      display: flex;
  }

  .single-pic .content {
      flex: 2;
      font-size: 17px;
      padding-right: 24px;
  }

  .single-pic img {
      width: 33%;
      display: block;
  }
</style>