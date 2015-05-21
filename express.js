var express = require('express');
var request = require('request');

var app = express();
// app.get('/', function(req, res){
//   var html = jade.renderFile('./views/index.jade');
//   res.send(html);
// });
app.use(express.static('public'));

app.get('*',function(req, res) {
  request('http://mpilot.auto.co.il/autoAPI.svc' + req.url, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        res.send(JSON.parse(body));
      }
  });
});

app.listen(3000);