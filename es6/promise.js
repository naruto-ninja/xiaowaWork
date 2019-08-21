(function(global) {
  function Promise(processor) {
    if(!processor) return;
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
      (err) => {
       this._reject(err);
      }
    );
  }
  Promise.prototype = {
    constructor: Promise,

    _taskCallback: function(value, processor, next) {
      
      var preResult = processor(value);

      if(preResult instanceof Promise) {
        preResult.next = next;

        preResult.then(function (res) {
          next._resolve(res);
        });

        preResult.catch(function (res) {
          next._reject(res);
        });
        return;
      }
      if(this._state === 'fulfilled') {
        next._resolve(preResult);
      } else {
        next._reject(preResult);
      }
    },

    onRejected: function onReject(err) {
      this.next._reject(err);
    },

    onFulfilled: function onFulfilled(res) {
        this.next._resolve(res);
    },

    then: function(onFulfilled) {
      // onFulfilled为then中的回调函数
      this.onFulfilled = onFulfilled;
      // 兼容then中返回新的promise，这里实例化一个新的Promise
      this.next = new Promise();

      // 如果promise后多个then执行函数，可以把上一个then函数执行记录为一个promise，这样就可以继续调用下一个.then方法
      // 执行resolve后，状态变为fulfilled，然后执行then回调，把resolve中的res（值）传递给onFulfilled处理
      if(this._state === 'fulfilled') {
        this._taskCallback(
          this.currentValue,
          this.onFulfilled.bind(this),
          this.next
        )
      }
      return this.next;
    },

    catch: function(onReject) {
      // reject 之后，catch捕获reject的异常
      this.onRejected = onReject;
      this.next = new Promise();
      
      if(this._state === 'rejected') {
         this._taskCallback(
          this.currentErr,
          this.onRejected.bind(this),
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
      if(this.next && this.onFulfilled) {
        this._taskCallback(
          this.currentValue, 
          this.onFulfilled.bind(this), 
          this.next
        )
      }
    },

    _reject: function _reject(err) {
      this._state = 'rejected';
      this.currentErr = err;
      if(this.next && this.onRejected) {
        this._taskCallback(
          this.currentErr, 
          this.onRejected.bind(this), 
          this.next
        )
      }
    }
  }
  global.Promise = Promise;
})(window)