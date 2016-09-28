var candidates = [];

function checkIP(ip, cb, last){
	var httpReq = new XMLHttpRequest();
	httpReq.onreadystatechange = function(e){
		console.log(ip, httpReq.getAllResponseHeaders());
		if (httpReq.responseText !== "") cb(httpReq.responseText, httpReq.responseURL);
		if (last) last(candidates);
	}
	httpReq.open("GET", "http://" + ip, true);
	httpReq.send(null);	
}

function extractTitle(html, ip){ // <title> is the most likely place to contain info about the router/provider
	var startTag = html.indexOf("<title>");
	var endTag = html.indexOf("</title>");
	if (startTag < 0) startTag = html.indexOf("<TITLE>");
	if (endTag < 0) endTag = html.indexOf("</TITLE>");
	var title = html.substring(startTag + 7, endTag);
	var info = "Found: " + title + " at: " + ip;
	if (candidates.indexOf(info) < 0) candidates.push(info);
}

function checkListOfIPs(list, onfinish){
	var last = null;
	list.forEach(function(ip,i){
		if (i == list.length-1) last = onfinish;
		checkIP(ip, extractTitle, last);
		
	})
	console.log(candidates);
}

var listOfIps = ("10.0.0.138-10.0.0.1-10.1.10.1-10.0.1.1-10.10.1.1-10.0.0.2-10.1.1.1-10.90.90.90-" + 
	"192.168.1.1-192.168.0.1-192.168.1.254-192.168.1.10.1-192.168.2.1-192.168.254.254-192.168.3.1-" + 
	"192.168.11.1-192.168.0.30-192.168.0.50-192.168.0.10-192.168.0.101-192.168.15.1-192.168.8.1-" + 
	"192.168.1.200-192.168.100.1-192.168.123.254-192.168.1.10-192.168.1.210-192.168.1.99-192.168.16.1-" + 
	"192.168.10.1-192.168.20.1-192.168.30.1-192.168.62.1-192.168.102.1-192.168.0.227-192.168.10.50-" + 
	"192.168.0.3-192.168.168.168-192.168.50.1-192.168.55.1-192.168.251.1-192.168.0.254-192.168.0.100-" + 
	"192.168.1.100-192.168.10.10-192.168.10.100-192.168.223.100-200.200.200.5-192.168.4.1-192.168.100.100-" +
	"192.168.2.254").split("-");