var fsExtra = require('fs-extra');

module.exports = api => {
  api.registerCommand('publish', args => {
    const webpackConfig = api.resolveWebpackConfig();
    console.log('publish!!!!', webpackConfig);
    const distDir = webpackConfig.output.path
    fsExtra.copy(
      distDir,
      '/Users/naruto/Desktop/mycode/xiaowaWork/vue-test/vue-toutiao-cli/online'
    );
  })
}