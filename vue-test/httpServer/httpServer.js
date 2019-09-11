var http = require('http'); 
var https = require('https');
var fs = require('fs'); 
var app = http.createServer((req, res) => {
  // https://api.weixin.qq.com/sns/jscode2session?appid=wxf020f27489599ca4&secret=6ec21bc1da3b4a160b930b5c1c0d37a8&js_code=${code}&grant_type=authorization_code

  if(/login/.test(req.url)) {
    // login 逻辑
    const code = /code=([^&]*)/.exec(req.url);
    https.get(
      `https://api.weixin.qq.com/sns/jscode2session?appid=wxf020f27489599ca4&secret=6ec21bc1da3b4a160b930b5c1c0d37a8&js_code=${code}&grant_type=authorization_code`,
      function(resHandler) {
        var str = '';
        resHandler.on('data', (chunk) => {
          str += chunk;
        });
        resHandler.on('end', function() {
          res.write(JSON.stringify({
            errMsg: JSON.stringify(str)
          }));
          res.end()
        });
      }
    );
  } else {
    fs.readFile(__dirname + '/list___all__.json', 'utf-8', function (err, content) { 
      // console.log('err:', err, content); 
      res.write(content);
      res.end(); 
    }); 
  }
}); 
    
app.listen(9000);