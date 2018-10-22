
function WidgetClass(id, name, x, y, w, h) {

    this.id = id;
    this.name = name;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.color = (220, 220, 220);
    this.detailMode = false;

  
    this.update = function() {
      
    };

    this.onPress = function(x, y) {
        console.log("clicked");

        if(x >= this.x && x <= this.x+this.w && y >= this.y && y <= this.y+this.h){
            console.log("changed");
            //change mode
            this.detailMode = !this.detailMode; 
            this.color=(200, 0, 0);   
        }        
    }
  
    this.display = function() {

      if(sensorArray.length != null 
        && sensorArray[id].tempArray.length>0 
        && sensorArray[id].humArray.length>0
        && sensorArray[id].rssiArray.length>0
        ){
      
        noStroke();

        var lastTemp = int(sensorArray[id].tempArray[sensorArray[id].tempArray.length-1]);
        var lastHum = int(sensorArray[id].humArray[sensorArray[id].humArray.length-1]);
        var lastRssi = int(sensorArray[id].rssiArray[sensorArray[id].rssiArray.length-1]);
        var lastUpdate = int((new Date().getTime() - sensorArray[id].lastUpdate)/1000);

  
        //background color
        if(lastTemp >=18 && lastTemp <=24 && lastHum >=30 && lastHum <=60){
          fill(50, 200, 50);  
        }else{
          fill(200, 50, 50);  
        }
        
        //color Mode dinamic
        colorMode(HSB, 360, 100, 100);
        fill(360-lastTemp*10, 50+lastTemp*2, 100-lastTemp/2, 50+lastTemp*5);        
        //fill(this.color);
        rect(this.x, this.y, this.w, this.h);
        
        colorMode(RGB, 255, 255, 255);
        textAlign(CENTER, CENTER);        
  
        fill(255);
        textSize(24);
        text(this.name, this.x+this.w/2, this.y+this.h/8);
  
        fill(255);
        textSize(48);
        text(lastTemp+" ºC", this.x+this.w/2, this.y+this.h/2);
  
        fill(0);
        textSize(28);
        text(lastHum+" %", this.x+this.w/2, this.y+this.h*3/4);

        fill(200);
        textSize(18);
        //text(lastRssi, this.x+this.w*7/8, this.y+this.h*7/8);

        fill(0);
        text(lastUpdate+" s.", this.x+this.w*7/8, this.y+this.h*7/8);

        fill(50, 200, 50);
        ellipse(this.x+this.w*7/8, this.y+this.h/8, 30, 30);    

      
      }else{
        noStroke();
        textAlign(CENTER, CENTER);

        fill(220);
        rect(this.x, this.y, this.w, this.h);

        fill(0);
        textSize(24);
        text(this.name, this.x+this.w/2, this.y+this.h/8);        

        fill(100);
        textSize(24);
        text("Conectando...", this.x+this.w/2, this.y+this.h/2);

        fill(200, 50, 50);
        ellipse(this.x+this.w*7/8, this.y+this.h/8, 30, 30);

      }

    };
  
  }
  