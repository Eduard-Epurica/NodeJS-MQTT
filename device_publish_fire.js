var mqtt = require('mqtt');
//const token = "Za5Ni3cOPK4l7SEPBgk6";
const Host = "84.240.190.221";
var timeout;
var publishInterval = 1; //second
console.log('Connecting');

var fs = require('fs')
var path = require('path')
var KEY = fs.readFileSync(path.join('./Beiakey.key'))
var CERT = fs.readFileSync(path.join('./activemq_beia_cert.pem'))
var TRUSTED_CA_LIST = fs.readFileSync(path.join('./ca_cert.pem'))
var PORT = 443

var options = {
  port: PORT,
  host: Host,
  key: KEY,
  cert: CERT,
  rejectUnauthorized: true,
  // The CA list will be used to determine if server is authorized
  ca: TRUSTED_CA_LIST,
  protocol: 'mqtts'
}

var options2 = 
{
	host: Host,
	protocol: 'mqtt'
}

var client = mqtt.connect(options);
    
client.on('connect', function () {    console.log('Client connected!');

    console.log('Uploading data per ' + publishInterval + ' seconds...');
    if (timeout) {
        clearTimeout(timeout);
    }
    timeout = setInterval(publishTelemetry, publishInterval * 1000);
});
function publishTelemetry() {
    var data = getData();
    console.log('Sending: ' + data);
    client.publish('beia/fire', data);
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

//var sensor = require("node-dht-sensor").promises;

//sensor.setMaxRetries(10);
//sensor.initialize(22, 4);
 

var fire = 0;

function publish(){
console.log(
        `fire: ${fire}%`
    );
	
}

setTimeout(publish,1000);

var i=0;

function getData() {
    var data = {
            "fire_sensor": fire,
            };
	if(i<10) {
		fire = 0
		i++ }
	else
	{	i=0
		fire = 1 }
   

    return JSON.stringify(data);
}
