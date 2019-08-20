<template>
  <div class="item single-pic">
     <h3>农业 猪价</h3>
     <div class="image-list">
       <label for="">输入地区：</label>
        <input type="text" v-on:input="oninput" />
        <span>地区为: {{area}}</span>
     </div>
     <div>
       猪价： {{price | addCount}}
     </div>
     <echarts></echarts>
  </div>
</template>

<script>

export default {
  data() {
    return {
      area: '北京',
      price: 0,
      debounce: this.createDebounce(3000)
    }
  },

  filters: {
    addCount(price) {
        return price + '$'
    }
  },

  created() {
    this.$watch('area', area => {
      this.queryPigPrice(area);
    })
  },

  methods: {
    oninput(e) {
      const debounce = this.debounce;
      debounce(() => {
        this.area = e.data;
      })
    },

    queryPigPrice(area){
      fetch('/price?area=' + area)
        .then(res => res.json())
        .then(priceRes => {
          this.price = priceRes.infos[0].price
        })
    }
  }
}
</script>>