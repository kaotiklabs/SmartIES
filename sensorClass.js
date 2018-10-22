// Graph class
function SensorClass(id, name) {

  console.log("Creating sensor: "+id+" name: "+name);
  this.id = id;
  this.name = name;

  this.tempArray = [];
  this.humArray = [];
  this.rssiArray = [];
  this.creationDate = new Date().getTime();  
  this.lastUpdate = new Date().getTime();  
  
  this.tempMin=0;
  this.tempMax=0;
  this.tempMean=0;

 
  this.update = function() {
    this.lastUpdate = new Date().getTime();     
  };

  this.display = function() {
    
  };
}
