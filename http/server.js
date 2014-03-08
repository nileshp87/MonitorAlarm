var express = require('express');
var app = express();
var sys = require('sys');
var spawn = require('child_process').spawn;
var numAlarms = 0;
var alarms = new Array();
var currHour, currMinute;
var notifications = [
					{
						"title" : "The Avengers",
						"command" : "./avenge.sh"
					},
					{
						"title" : "Malcolm in the Middle",
						"command" : "./malcolm.sh"
					}
					];
var initializationCommand = "../monitorToggle.py";

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

app.get('/notifications', function(req, res){
	res.send(notifications);
});

app.get('/startAlarm', function(req, res){
	startAlarm(req.query.notification);
	return res.send(true);
});

function checkAlarm(){
	var d = new Date();
	currHour = d.getHours();
	currMinute = d.getMinutes();
	alarms.forEach(toAlert);
	if(alarms.length == 0)
		numAlarms = 0;
}

function toAlert(curr, index, arr){
	if(curr.hour == currHour && curr.minute == currMinute)
	{
		startAlarm(index);
		arr.splice(index, 1);
	}
}

function startAlarm(id){
	spawn(initializationCommand);
		setTimeout(function(){ spawn(notifications[id].command); }, 3000);
		console.log("[" + currHour + ":" + currMinute +"] Now Running: " + notifications[id].command)
}
app.listen(8080);
setInterval(checkAlarm, 60000);
console.log('Listening on port 8080...');
