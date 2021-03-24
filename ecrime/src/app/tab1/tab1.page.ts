import { Component,OnInit } from '@angular/core';
import * as l from 'leaflet';
import { LoadingController } from '@ionic/angular';
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
  constructor(public loadingController: LoadingController) {}

  ngOnInit(){
    // this.leafletMap().then(() =>{
    //   this.locator()
    // })
  }

  locator(){
    this.presentLoading("please wait We're locating you").then(() => {
      this.map.locate({
        setView: true 
      }).on('locationfound', e =>{
        this.loading.dismiss()
       var radius = e.accuracy / 2;
      //  this.request.lat = e.latitude
      //  this.request.lng = e.longitude
      
        
        var customIcon = l.icon({
          iconUrl: '../../../../assets/mapmarker/marker-icon.png',
          shadowUrl: '../../../../assets/mapmarker/marker-shadow.png',
          
           
          popupAnchor: [10, 0]
          });
          this.map.setView([e.latitude, e.longitude], 20)
          l.marker([e.latitude, e.longitude],{icon: customIcon}).addTo(this.map).bindPopup("Heres where you are right now").openPopup()
          l.circle([e.latitude,e.longitude], 150).addTo(this.map);
         
          // marker.on("dragend",function(e){
           
          // })
          // this.request.loading.dismiss()
          setTimeout(() =>{
            this.map.invalidateSize(true)  
            this.map.locate({setView: true, watch: true, maxZoom: 8}); 
          },100) 


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
    l.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
      attribution: '',
    }).addTo(this.map);


    

  
  }

  async presentLoading(message:string) {
    this.loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: message,
      duration: 2000
    });
    await this.loading.present();

    const { role, data } = await this.loading.onDidDismiss();
    console.log('Loading dismissed!');
  }
  

}
