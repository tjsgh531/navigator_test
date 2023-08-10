export class CurrentPos{
    constructor(){
        
    }

    getLocation() {
        return new Promise((resolve, reject) => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((position)=>{
                    const currentLocation = {
                        latitude : position.coords.latitude,
                        longitude : position.coords.longitude,  
                    }
                
                    resolve(currentLocation);
                }, reject);
            } else {
                reject(new Error('Geolocation이 지원되지 않는 브라우저입니다.'));
            }
        });
    }
}