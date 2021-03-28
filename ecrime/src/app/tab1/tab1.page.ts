import { Component,OnInit } from '@angular/core';
import * as l from 'leaflet';
import { LoadingController } from '@ionic/angular';
import { GlobalService} from '../services/global.service'
import { RequestService} from '../services/request.service'
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  options = {
    layers: [
      l.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
        attribution: '&copy; OpenStreetMap contributors'
      })
    ],
    zoom: 7,
    center: l.latLng([ 46.879966, -121.726909 ])
  };

  map: l.Map;
  loading:any
  crimeresult:any
  constructor(public request: RequestService,public global: GlobalService,public loadingController: LoadingController) {
    this.crimeresult = Array()
  }

  ngOnInit(){
   
     
  
  }

  getCrimes(){
    this.request.getData("get-crimes.php").subscribe(res =>{
       let result = res.json()
       
       for(var i =0;i < result.length;i++){
        this.markerdroper(result[i])
       }

    })
  }
  c:number = 0
  markerdroper(crime){
     this.c+=0.001
     
     console.log(this.global.address)
     l.marker([crime.lat,crime.lng],{icon: this.customIcon,id: crime.id,crime: crime}).addTo(this.map).bindPopup("awdawd").on('click', (e) =>{
      console.log(e)

      console.log(e.target.options.crime)
     })
     
     
     
    
  }

  customIcon = l.icon({
    iconUrl: '../../../../assets/mapmarker/marker-icon.png',
    shadowUrl: '../../../../assets/mapmarker/marker-shadow.png',
    
     
    popupAnchor: [10, 0]
    });
   
  async locator(){
    this.presentLoading("please wait we're locating you").then(() => {

    
       
        
  
      

        this.map.locate({
          setView: true ,
          
          maxZoom: 20
        }).on('locationfound', e =>{
          this.global.address = {
            lat: e.latitude,
            lng: e.longitude
          }
  
          this.loading.dismiss()
      
        //  this.request.lat = e.latitude
        //  this.request.lng = e.longitude
        
          
          
    
            
            
           l.circle([this.global.address.lat, this.global.address.lng],{
              radius: 10000,
              stroke: true,
              color: 'black',
              opacity: 1,
              weight: 1,
              fill: true,
              fillColor: "green",
              fillOpacity: 0.3
             }).addTo(this.map).bindPopup("Here where you are right now");
            //  l.marker([this.global.address.lat, this.global.address.lng],{icon: this.customIcon}).addTo(this.map).bindPopup("awdawd")
             this.map.invalidateSize(true) 

             setTimeout(() =>{
           
              this.getCrimes()
            },500)
            //  l.marker([lat,lng],{icon: this.customIcon}).addTo(this.map).bindPopup("awd555awd")
  
            
            
              
          
             
  
  
            // this.loadMarkers()
        },err =>{
          alert(err)
          this.loading.dismiss()
        })
     

      
    }) 
  }

  async leafletMap() {
    // In setView add latLng and zoom
    this.map = new l.Map('mapId').setView([28.644800, 77.216721], 10);
    l.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);


    

  
  }

  async presentLoading(message:string) {
    this.loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: message,
       
    });
    await this.loading.present();

    
  }

  ionViewWillEnter() { 
    
    this.leafletMap().then(() =>{
      this.locator().then(() =>{
       
      })
    })  


 
 
  }

  ionViewWillLeave() {
    this.map.remove();
  }
  

}
