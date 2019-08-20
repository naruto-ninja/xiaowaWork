/** 
 * @file 工具函数集合文件
 * @author naruto
*/
import echarts from 'echarts';

const THRESHOLD = 50;

// throttle 节流
const createThrottle = (delay = 1000) => {
  let status = 'START';
  return (fn) => {
      if (status === 'WAITING') {
          return;
      }
      status = 'WAITING';
      setTimeout(() => {
          fn && fn();
          status = 'START';
      }, delay);
  };
};

// debounce 防抖
const createDebounce = (delay = 1000) => {
  let timmer = null;
  return function debounce (fn) {
    clearTimeout(timmer);
    timmer = setTimeout(() => {
      fn && fn();
    }, delay)
  }
}

export default {
  install : Vue => {

    Vue.mixin({
      data() {
        return {}
      },
      created() {
        if(typeof this.onReachBottom === 'function') {
          let throttle =  createThrottle(3000);
          window.addEventListener('scroll' , () => {
            const offsetHeight = document.documentElement.offsetHeight;
            const screenHeight = window.screen.height;
            const scrollY = window.scrollY;
            const gap = offsetHeight - screenHeight - scrollY;
            if (gap < THRESHOLD) {
              throttle(() => {
                this.onReachBottom && this.onReachBottom();
              })
            }
          })
        }
      },

      methods: {
        createThrottle,
        createDebounce
      }
    });

    Vue.component('echarts', {
      render(createElement) {
        return createElement(
          'div',
          {
            attrs: {
              id: this.randomId
            },
            style: {
              height: '100px',
              width: '100%'
            },
            directives: [
              {
                name: 'echarts'
              }
            ]
          }
        )
      },
      mounted() {
        // const echartsHandler = echarts.init(this.$el);
        // 指定图表的配置项和数据 
        var option = {
          title: {
              text: 'ECharts 入门示例'
          },
          tooltip: {},
          legend: {
              data:['销量']
          },
          xAxis: {
              data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
          },
          yAxis: {},
          series: [{
              name: '销量',
              type: 'bar',
              data: [5, 20, 36, 10, 10, 20]
          }]
        };
         // 使用刚指定的配置项和数据显示图表。
         this.echartsHandler.setOption(option);
      },
      computed: {
        randomId() {
          return 'echarts-' + Math.floor(Math.random() * 10)
        },
      },
      methods: {
        revieverEchartsHandler(handler) {
          this.echartsHandler = handler;
        }
      }
    });
    
    // 自定义指令
    Vue.directive('echarts', {
      inserted(el, binding, vnode) {
        const echartsHandler = echarts.init(el);
        vnode.context.revieverEchartsHandler && vnode.context.revieverEchartsHandler(echartsHandler);
      }
    })
  }
}