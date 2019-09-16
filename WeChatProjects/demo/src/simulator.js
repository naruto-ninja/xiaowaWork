const automator = require('miniprogram-automator');
const path = require('path')

const miniProgram = automator.launch({
  projectPath: path.resolve(__dirname)
}).then(miniProgram => {
  miniProgram
    .currentPage()
    .then(page => {
      return page
        .waitFor(1000)
        .then(() => page)
    })
    .then(page => page.$('multiplepic'))
    .then(element => {
      if(element && element.tagName === 'multiplepic') {
        console.log('测试通过');
      } else {
        console.log('测试未通过');
      }
      miniProgram.close();
    })
})