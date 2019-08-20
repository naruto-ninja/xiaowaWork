(function(global) {
  function Promise(processor) {
    // promise 有三个状态 pending fulfilled rejected
    this._state = 'pending';
    // promise 内部函数不是异步，会立即执行
    processor(
      // promise接收两个参数， resolve和reject
      // resolve
      (res) => {
        this._resolve(res);
      },
      // reject
      () => {
        this._state = 'rejected';
      }
    );
  }
  Promise.prototype = {

    _taskCallback: function(value, processor, next) {
      var preResult = processor(value);
      next._resolve(preResult);
    },

    then: function(onFulfilled) {
      // onFulfilled为then中的回调函数
      this.onFulfilled = onFulfilled;

      // 如果promise后多个then执行函数，可以把上一个then函数执行记录为一个promise，这样就可以继续调用下一个.then方法
      this.next = new Promise((resolve, reject) => {});

      // 执行resolve后，状态变为fulfilled，然后执行then回调，把resolve中的res（值）传递给onFulfilled处理
      if(this._state === 'fulfilled') {
        this._taskCallback(
          this.currentValue, 
          this.onFulfilled, 
          this.next
        )
      }
      return this.next;

    },

    // 定义一个私有变量，避免在process中resolve和reject过于臃肿
    _resolve: function _resolve(res) {
      // 执行resolve时，状态由pending变为fulfilled
      this._state = 'fulfilled';
      this.currentValue = res;
      // 如果在promise中，立即执行resolve，这时then中的回调也就是onFulfilled为undefined，这里做兼容处理
      if(this.onFulfilled) {
        this._taskCallback(
          this.currentValue, 
          this.onFulfilled, 
          this.next
        )
        // this.onFulfilled(this.currentValue);
      }
    },
    _reject: function _reject(res) {

    }
  }
  global.Promise = Promise;
})(window)
