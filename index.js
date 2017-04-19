var path = require('path');
var express = require('express');
var app = express();
var connect = require('connect');
var http = require('http');
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var Task = require('./Tasks_model');


// parse urlencoded request bodies into req.body
var bodyParser = require('body-parser');

// create application/json parser
var jsonParser = bodyParser.json();

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){
	res.sendFile('/public/index.html');
});

app.get('/api/todos', function(req, res) {
	Task.find({})
	.exec(function(err, results) {
		if(err){
			res.send('error occured');
		}
		else {
			res.send(results);
		}

	});
});

app.listen(3000, function (){
	console.log('Listening on port 3000');
});
app.post('/api/todos/new', jsonParser, function(req, res){

	Task.remove({});
	Task.create(req.body.updated_tasks, function (err, task){
		if(err){
			console.log("Error has been occured, could not save to database");
		}
		else {
	 		console.log(task);
		}
	 });
});