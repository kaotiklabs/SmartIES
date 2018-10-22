
var myFont;
var sensorArray = [];
var widgetArray = [];
var clientname = "webclient-"+ new Date().getTime();


function preload() {
  myFont = loadFont('assets/AvenirNextLTPro-Demi.otf');
}

function setup() {
    
    createCanvas(840, 840);

    heat = simpleheat('heatcanvas');
    var canvas1 = document.getElementById("heatcanvas");   
    //canvas1.style.display="none";
    heat.radius(50, 100);
    heat.max(26);
    heat.gradient({0.0: 'pink', 0.2: 'purple', 0.4: 'blue', 0.6: 'green', 0.8: 'yellow', 1: 'red'});

    
    console.log("Start...");
    var serveraddress = "54.37.66.60";
    //var serveraddress = "172.18.198.3";
    var serverport = 1884;
    var serverpath = "/";
    

    // Create a client instance    
    client = new Paho.MQTT.Client(serveraddress, Number(serverport), serverpath, clientname);

    // set callback handlers
    client.onConnectionLost = onConnectionLost;
    client.onMessageArrived = onMessageArrived;

    var options = {
        timeout: 3,
        //userName:"xabia",
        //password:"montgo",
        userName:"openhab",
        password:"openhab",        
        onSuccess: onConnect
    };

    console.log("Server="+ serveraddress + ", port=" + serverport + ", " + " client=" + clientname);

    // connect the client
    client.connect(options);
    
    heatmapSetup();
}

function draw() {
    
  background(255);

  // fill(255, 0, 0);
  // ellipse(0, 0, 10, 10);
  // ellipse(710, 400, 10, 10);

  // fill(255, 255, 255);
  // for (var i=0; i<tempArray.length; i++) {
  //   ellipse(i*40, height-int(tempArray[i].y), 20, 20);
  // }

  // strokeWeight(5);
  // stroke(255, 255, 255);
  // noFill();
  // beginShape();
  // curveVertex(0, 0);
  // for (var i=0; i<tempArray.length; i++) {
  //   curveVertex(i*40, height-int(tempArray[i].y));
  // }
  // if(tempArray.length > 0){
  //   curveVertex(i*40, height-int(tempArray[tempArray.length-1].y));
  // }            
  // endShape();
  // strokeWeight(1);
  // stroke(0, 0, 0);

  fill('#ED225D');
  textSize(32);
  textFont(myFont);

  textAlign(LEFT, BOTTOM);
  text(clientname, 10, 50);       

  for (var i=0; i<widgetArray.length; i++) {
    widgetArray[i].update();
    widgetArray[i].display();
  }
}

// When the user clicks the mouse
function mousePressed() {

    for (var i=0; i<widgetArray.length; i++) {
    widgetArray[i].onPress(mouseX, mouseY);
  }

}

// called when the client connects
function onConnect() {
  // Once a connection has been made, make a subscription and send a message.
  console.log("Connection OK");
  console.log("Listening for data...");

  //client.subscribe("/sensors/#");
  client.subscribe("/home/sensors/#");  
  //client.subscribe("#");

  //client.subscribe("/openhab/state/PowerMeter");
  //message = new Paho.MQTT.Message("Hello");
  //message.destinationName = "/test/";
  //client.send(message);
}

// called when the client loses its connection
function onConnectionLost(responseObject) {
  if (responseObject.errorCode !== 0) {
    console.log("onConnectionLost:"+responseObject.errorMessage);
  }
}

// called when a message arrives
function onMessageArrived(message) {
    var topic = message.destinationName;
    var payload = message.payloadString;
    
    
    var result = topic.split("/");   // result is a n element array, ["a", "multi", "part", "filename"]
    //var bufname = result[2];
    var bufname = result[3];
    console.log("onMessageArrived with topic: "+topic+" payload: "+payload);

    //fins sensor name in sensorArray, if not, create it    
    var bufsensor = sensorArray.find(function (bufsensor) { return bufsensor.name === bufname; });
 
    if(bufsensor == null){
      console.log("new sensor found: "+bufname);  
      bufsensor = new SensorClass(sensorArray.length, bufname);
      sensorArray.push(bufsensor);      
      widgetArray.push(new WidgetClass(bufsensor.id, bufname, 10+(bufsensor.id%4)*205, 100+Math.floor(bufsensor.id/4)*205, 200, 200));
    }else{
      console.log("sensor exists");
    }

    if(topic.includes("temperature")){    
      sensorArray[bufsensor.id].tempArray.push(payload);  
    }
    
    if(topic.includes("humidity")){
      sensorArray[bufsensor.id].humArray.push(payload);
    }    

    if(topic.includes("rssi")){
      sensorArray[bufsensor.id].rssiArray.push(payload);
    }       

}




function heatmapSetup(){

  heat.clear();

  for (let index = 0; index < 20; index++) {
    heat.add([random(640), random(480), random(10, 35)]);    
  }

  heat.draw();
  
}