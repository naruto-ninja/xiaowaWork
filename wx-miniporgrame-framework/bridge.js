/**
 * 
 * @file 小程序核心逻辑层
 * @author naruto
 */

 class Bridge {
  createView(id) {
    return new Promise(resolve => {
      let frame = document.createElement('iframe');
      frame.src = './view.html';
      frame.id = id;
      frame.onload = () => resolve(frame);
      document.body.appendChild(frame);
    })
  }

  // 逻辑层向视图层发送消息
  /** 
   * @param {string} [id]
   */
  postMessage(id, params) {
    const target = document.querySelector('#' + id);
    target.contentWindow.postMessage(params);
  }

  onMessage(callback) {
    window.addEventListener('message', function(event) {
      console.log('onMessage event::', event);
      callback && callback()
    })
  }
 }

 window.__bridge = new Bridge();