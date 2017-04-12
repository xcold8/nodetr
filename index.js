var path = require('path');
var express = require('express');
var app = express();
var connect = require('connect');
var http = require('http');


// parse urlencoded request bodies into req.body
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));

var json1 = [{"title":"Buy Milk","done":true},{"title":"Go to bank","done":false},{"title":"Win 10K jackpot in poker game","done":false}];
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res){
	res.sendFile('./public/index.html');
});

app.get('/api/todos', function (req, res) {
	res.send(json1);
});

app.listen(3000, function (){
	console.log('Listening on port 3000');
});
app.post('/api/todos/new', function(req, res){
	udata = req.body;
	console.log(udata);
});