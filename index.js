var path = require('path');
var express = require('express');
var app = express();
var connect = require('connect');
var http = require('http');
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var models = require('./models');
var Task = models.Task;
var User = models.User;


// parse urlencoded request bodies into req.body
var bodyParser = require('body-parser');

// create application/json parser
var jsonParser = bodyParser.json();

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', function(req, res){
	res.sendFile('/public/index.html');
});
app.get('/todos', function(req, res){
	res.sendFile('/public/todos.html');
});

app.post('/login', jsonParser, function(req,res){
	User.create(req.body, function (err, data){
		if (err){ console.log('error occured');
		} else {
			console.log(data);
		}
	});
	res.sendStatus(200);

});

app.get('/api/todos', function(req, res) {
	User.find({email: req.body.email})
	.exec(function(err, results) {
		if(err){
			res.send('error occured');
		}
		else {
			res.send(results);

			return results;

		}

	});
});

app.listen(3000, function (){
	console.log('Listening on port 3000');
});
app.post('/api/todos/new', jsonParser, function(req, res){
		User.remove({ tasks: [{}]}, function (err){
		if (err) return handleError(err);
		else { 
			console.log('deleted successfully');
		}	
});
	var userEmail = req.body.email;
	console.log(userEmail);
	var jdata = req.body.updated_tasks;
	for (var i=0; i < jdata.length; i++){
		User.create({user: userEmail, tasks:[jdata[i]]}, function (err,task){
			if(err){
				console.log("Error has been occured, could not save to database");
			}
			else {
	 			console.log(task);
			}
	});

   }
});