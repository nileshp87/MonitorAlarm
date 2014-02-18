var express = require('express');
var app = express();
var numAlarms = 0;
var alarms = new Array();

function Alarm(id, time, notification)
{
	this.id = id;
	this.time = time;
	this.notification = notification;
}

app.use(express.json());
app.use(express.urlencoded());

app.get('/hello.txt', function(req, res){
  res.send('Hello World!');
});

app.get('/', function(req, res){
  res.sendfile('index.html');
});

app.post('/createAlarm', function(req, res){
//  console.log(req.body);
	numAlarms++;
	alarms.push(new Alarm(numAlarms, req.body.time, req.body.notification));
	res.send(alarms[0]);
  
});

app.listen(8080);
console.log('Listening on port 8080...');
