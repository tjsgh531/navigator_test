export class InitMap {
    constructor() {

    }
  
    createTmap() {
        try {
            return new Promise((resolve, reject) => {
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition((pos)=>{
                        const position = {
                            newLatitude : pos.coords.latitude,
                            newLongitude : pos.coords.longitude,
                        };
                        resolve(position);
                    }, reject);
                } else {
                    reject(new Error('Geolocation이 지원되지 않는 브라우저입니다.'));
                }
            }).then((position)=>{
                let map = new Tmapv3.Map("map_div", {
                    center: new Tmapv3.LatLng(position.newLatitude, position.newLongitude),
                    width: "100%",
                    height: "100vh",
                    zoom: 18
                });
    
                return map;
            });
        }catch{
          console.error("navigator 문제인가...?");
        }
    }
    
    updateMap(map, lat, lon){

        console.log("맵의 중심 : ", map.getCenter());

        const newcenter = new Tmapv3.LatLng(lat, lon);
        map.setCenter(newcenter);

        return map;
    }
    
}
  
