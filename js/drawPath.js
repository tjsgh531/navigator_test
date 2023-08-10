
import { CurrentPos } from "./currentPos.js";
import { DrawShape } from "./drawShape.js";
import { InitMap } from "./initmap.js";

class DrawPath{
    constructor(){
        this.currentPos = new CurrentPos();
        this.maptool = new InitMap()
        
        this.maptool.createTmap().then((map)=>{

            this.map = map;
            this.drawTools = new DrawShape(this.map);
       
            this.centerCircle, this.preLat, this.preLon;
            
            setInterval(()=>{
                
                this.currentPos.getLocation().then((newLocation)=>{                
                    this.drawCenter(newLocation.latitude, newLocation.longitude);
                    this.drawLine(newLocation.latitude, newLocation.longitude)
                });
                
            },1000);
        });

    }


    drawCenter(lat, lon){
        if(this.centerCircle){
            this.centerCircle = this.drawTools.moveCircle(this.centerCircle, lat, lon);
        }
        
        else{
            console.log("원 그려!");
            this.centerCircle = this.drawTools.addCircle(lat, lon, 4, 4, "#cccccc");
        }
        
    }

    drawLine(lat, lon){
        if(this.preLat == null || this.preLon == null){
            this.preLat = lat;
            this.preLon = lon;
        }
        else if(this.preLat == lat && this.preLon == lon){
            console.log("이전 좌표와 동일")
        }
        else{
            this.drawTools.addPolyline(this.preLat, this.preLon, lat, lon, 2, "#34C900"); 
        }
    }
      
}

window.onload = ()=>{
    new DrawPath();
}

window.addEventListener('click', ()=>{
    alert("STOP");
})