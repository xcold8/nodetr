var path = require('path');
var express = require('express');
var app = express();
var json1 = [{"title":"Buy Milk","done":true},{"title":"Go to bank","done":false},{"title":"Win 10K jackpot in poker game","done":false}];
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res){
	res.sendFile('/Users/haimayalon/nodetr/tasky.html');
});

app.get('/api/todos', function (req, res) {
	res.send(json1);
});

app.listen(3000, function (){
	console.log('Listening on port 3000');
});
