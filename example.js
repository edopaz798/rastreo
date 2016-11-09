var express = require('express')
var app = express()

var request = require("request");
var cheerio = require('cheerio');

var nrogui = 'VAL0391100661';


app.get('/', function (req, res) {
	
	var options = { method: 'POST',
  url: 'http://arexpress.controlbox.net/app/rastreo/rastreo.asp',
  headers: 
   { 'cache-control': 'no-cache',
     'content-type': 'application/x-www-form-urlencoded' },
  form: { nrogui: nrogui, ffw: '00001' } };
  
  
  request(options, function (error, response, body) {
	  if(!error){
		  var $ = cheerio.load(body.replace(/..\/images\/Cientes\/arExpress.jpg/g, "http://www.emcabox.com/rastreo/emcabox.jpg"));
		  var body2 = $.html();
		  
		  res.send(body2)
	  }
  
})
})

app.listen(3000)
console.log('Example app listening on port 3000!');
exports = module.exports = app;