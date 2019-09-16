const { watch, src, dest } = require(gulp);

const distPath = __dirname + '/dist';
const copyFiles = () => {
  return src(['src/**/**.js', 'src/**/**.wxml', 'src/**/**.wxss'])
    .pipe(dest(distPath))
}
module.exports.default = () => {
  watch('src/**/**', copyFiles)
};