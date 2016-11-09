var express = require('express')
var app = express()

var request = require("request");
var cheerio = require('cheerio');

/*var nrogui = 'VAL0391100661';*/

var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname + '/public'))

app.post('/', urlencodedParser, function (req, res) {

  var nrogui = req.body.nrogui;	
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



app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})
