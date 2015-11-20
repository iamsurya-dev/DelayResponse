var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var Promise = require('bluebird');

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var global = 0;



function timeFunc() {
	console.log("Inside time function :: global :: " + global);
	return new Promise(function (resolve, reject) {
		setTimeout(function() {
		  console.log('Setting timeout of 10 secs!');
		  resolve('done');
		}, 10000);
		
	}).then(function(result) {
      console.log('Result 1 ' + result);
      return result;
	});
}


function intermediateFunc() {
	console.log("Inside intermediateFunc");
	timeFunc()
	.then(function(rows) {console.log("Then request :: rows :: ", rows); global = 1;})
	.error(function(err) {console.log("Error is :: " + err);})
	.catch(function(err) {console.log("Catch is :: " + err);});
	
}


// Post request - to find a call another function that will set a variable global = 1 after 10 secs. It returns the request again.
app.post("/search", function(req, res) {
	console.log("request :::: ", req.body);
	intermediateFunc();
	console.log("sending response :: post ");
	res.send(req.body);
});

// Get request - To check the status of global variable. 
app.get("/getGlobal", function(req, res) {
	console.log("Inside server :: getGlobal ");
	if(global == 1)
		res.send(true);
	else
		res.send(false);
});


app.listen(3000);
console.log("server running on port 3000");