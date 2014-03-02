var express = require('express');
var app = express();
var numAlarms = 0;
var alarms = new Array();
var currHour, currMinute;
function Alarm(id, minute, hour, notification)
{
	this.id = id;
	this.minute = minute;
	this.hour = hour;
	this.notification = notification;
}

app.use(express.json());
app.use(express.urlencoded());

app.get('/pendingAlarms', function(req, res){
  res.send(alarms);
});

app.get('/', function(req, res){
  res.sendfile('index.html');
});

app.post('/createAlarm', function(req, res){
	numAlarms++;
	alarms.push(new Alarm(numAlarms, req.body.minute, req.body.hour, req.body.notification));
	res.send(true);
});

app.post('/deleteAlarm', function(req, res){
	alarms.forEach(
		function(val, ind, arr){
			if(val.id == req.body.id)
			{
				arr.splice(ind, 1);
				res.send(true);
			}
	});
	res.send(false);
});

app.get('/index.js', function(req, res){
	res.sendfile('index.js');
});

function checkAlarm()
{
	var d = new Date();
	currHour = d.getHours();
	currMinute = d.getMinutes();
	alarms.forEach(toAlert);
}

function toAlert(curr, index, arr)
{
	console.log("Current: " + currHour + ":" + currMinute);
	console.log("Compare: " + curr.hour + ":" + curr.minute);
	if(curr.hour == currHour && curr.minute == currMinute)
	{
		console.log(curr.notification);
		arr.splice(index, 1);
	}
}
app.listen(8080);
setInterval(checkAlarm, 60000);
console.log('Listening on port 8080...');
