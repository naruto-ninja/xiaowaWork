<template>
  <div>
    <span>这是登录页面</span>
    <button @click="login">登录</button>
  </div>
</template>
<script>
export default {
  methods: {
    login() {
      document.cookie = 'uid=123445';
      this.$router.back();
      console.log('document.cookie', document.cookie);
    }
  }
}
</script>>