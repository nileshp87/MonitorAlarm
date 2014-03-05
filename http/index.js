var notificationsArray;

function postData(url, data, callback){
	http = new XMLHttpRequest();
	http.open("POST", url, true);
	http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	http.onreadystatechange = function() {
		if(http.readyState == 4 && http.status == 200) {
			callback();
		}
	}
	http.send(data);
}

function getData(url, callback){
	var pending;
	http = new XMLHttpRequest();
	http.open("GET", url, true);
	http.onreadystatechange = function() { 
		if(http.readyState == 4 && http.status == 200) { 
			callback(JSON.parse(http.responseText)); 
	} }
	http.send(null);
}

function updatePending(){
	if(document.getElementById("pendingTable")){
		document.getElementById("pending").removeChild(document.getElementById("pendingTable"));
	}
	getData('/pendingAlarms', function(pending){
		var t = document.createElement('table');
		t.setAttribute("id", "pendingTable");
		header = document.createElement('tr');
		idhead = document.createElement('th');
		timehead = document.createElement('th');
		notifhead = document.createElement('th');
		delhead = document.createElement('th');
		idhead.appendChild(document.createTextNode('ID'));
		timehead.appendChild(document.createTextNode('Time'));
		notifhead.appendChild(document.createTextNode('Notification'));		
		delhead.appendChild(document.createTextNode('Delete?'));
		header.appendChild(idhead);
		header.appendChild(timehead);
		header.appendChild(notifhead);
		header.appendChild(delhead);
		t.appendChild(header);
		for(var i = 0; i < pending.length; i++){
			tr = document.createElement('tr');
			id = document.createElement('td');
			time = document.createElement('td');
			notif = document.createElement('td');
			del = document.createElement('td');
			btn = document.createElement('button');
			id.appendChild(document.createTextNode(pending[i].id));
			time.appendChild(document.createTextNode((pending[i].hour < 10 ? "0" + pending[i].hour : pending[i].hour) + ":" + (pending[i].minute < 10 ? "0" + pending[i].minute : pending[i].minute)));
			notif.appendChild(document.createTextNode(notificationsArray[pending[i].notification].title));
			btn.setAttribute("onClick", "deleteAlarm(" + pending[i].id + ")");
			btn.appendChild(document.createTextNode("Delete"));
			del.appendChild(btn);
			tr.appendChild(id);
			tr.appendChild(time);
			tr.appendChild(notif);
			tr.appendChild(del);
			t.appendChild(tr);
			t.appendChild(tr);
		}
		document.getElementById("pending").appendChild(t);
	});
}

function loadNotifications(){
	getData('/notifications', function(notifications){
		notificationsArray = notifications;
		var select = document.createElement('select');
		select.setAttribute('name','notification');
		for(var i = 0; i < notifications.length; i++){
			option = document.createElement('option');
			option.setAttribute('value',i);
			option.appendChild(document.createTextNode(notifications[i].title));
			select.appendChild(option);
		}
		document.forms[0].insertBefore(select,document.forms[0][2]);
	});
}

function deleteAlarm(id){
	postData('/deleteAlarm',"id="+id,function(stuff){updatePending();});
}

function createAlarm(hour, minute, notification){
	postData('/createAlarm', "minute="+ minute + "&hour=" 
		+ hour + "&notification=" + notification, function(){updatePending();});
}

function submitAlarm(){
	var form = document.forms[0];
	createAlarm(form[0].value, form[1].value, form[2].value);
	return false;
}

updatePending();
loadNotifications();