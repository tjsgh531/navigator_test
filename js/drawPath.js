
import { CurrentPos } from "./currentPos.js";
import { DrawShape } from "./drawShape.js";
import { InitMap } from "./initmap.js";

class DrawPath{
    constructor(){
        this.currentPos = new CurrentPos();
        this.maptool = new InitMap();
        this.drawTools = new DrawShape();
        
        this.maptool.createTmap().then((map)=>{
            this.map = map;
            this.drawTools.setMap(map);
       
            this.centerCircle, this.preLat, this.preLon;
                
            this.watchLocation();
           
        });

    }

    watchLocation(){
        if (navigator.geolocation) {
            this.watchid = navigator.geolocation.watchPosition((position)=>{
                const currentLocation = {
                    latitude : position.coords.latitude,
                    longitude : position.coords.longitude,  
                }
                this.drawCenter(currentLocation.latitude, currentLocation.longitude);
                this.drawLine(currentLocation.latitude, currentLocation.longitude);
            }, ()=>{
                console.error(`ERROR(${err.code}): ${err.message}`);
            }, {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0,
            });
        }

    }

    drawCenter(lat, lon){
        console.log(lat, lon);
        if(this.centerCircle){
            this.centerCircle = this.drawTools.moveCircle(this.centerCircle, lat, lon);
        }
        
        else{
            console.log("원 그려!");
            console.log(lat, lon);
            console.log(this.map);
            this.centerCircle = this.drawTools.addCircle(lat, lon, 10, 1, "#34C900");
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
            this.preLat = lat;
            this.preLon = lon;
        }
    }
      
}

window.onload = ()=>{
    new DrawPath();
}

window.addEventListener('click', ()=>{
    alert("STOP");
})