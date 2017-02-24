var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();

process.env['APPROOT'] = __dirname;

app.use(express.static('client'));

app.use(express.static('bower_components'));

app.use(bodyParser.json());



require(path.join(process.env['APPROOT'], './server/config/mongoose.js'));

require(path.join(process.env['APPROOT'], './server/config/routes.js'))(app);

app.listen(8000, function(){
  console.log('listening on port 8000');
});
