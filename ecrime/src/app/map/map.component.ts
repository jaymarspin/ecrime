import { Component, OnInit } from '@angular/core';
import * as l from 'leaflet';
import {GlobalService } from '../services/global.service'
import { RequestService } from '../services/request.service'
import { AlertController,PopoverController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  map: l.Map;
  loading:any
  constructor(public loadingController: LoadingController,public alertController: AlertController,private popoverController: PopoverController,public global: GlobalService,public request: RequestService) { }

  ngOnInit() {
    
  }
  customIcon = l.icon({
    iconUrl: '../../../../assets/mapmarker/warning.png',
    // shadowUrl: '../../../../assets/mapmarker/marker-shadow.png',
    iconSize:     [38, 45],
     
    popupAnchor: [0, 0]
    });
    marker:any
  async leafletMap() {
    // In setView add latLng and zoom
    this.map = new l.Map('mapping').setView([28.644800, 77.216721], 10);
    l.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: ' '
    }).addTo(this.map);

    this.marker = l.marker([this.global.address.lat, this.global.address.lng],{icon: this.customIcon,draggable:'true'}).addTo(this.map).on('click', (e) =>{
       
    }).bindPopup("Drag me to where the crime happened").openPopup();


    

  
  }
  // submit(){
  //   console.log(this.marker._latlng)
  // }

  submit(){
    // this.popoverController.dismiss();
    console.log(this.global.address)
 
      this.presentLoading().then(() =>{
        let data = {
          
          lat: this.global.address.lat,
          lng: this.global.address.lng,
          id: this.global.crime_id
          
    
        }
        this.request.postData("add-location.php",data).subscribe(res =>{
          console.log(res)
           
          let result = res.json()
          this.loading.dismiss()
          if(result.message == 'success'){
            // Toast
            // this.presentAlert("success! your report is on process now")
            delete(this.global.crime_id)
            this.presentAlert("success! your report is on process now")
            this.popoverController.dismiss({data: "success"});
             
            
          }
        },err=>{
          this.loading.dismiss()
          this.presentAlert(err)
        })
      })
      
  
    
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...', 
    });
    await this.loading.present();

   
  }

  async presentAlert(message) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Success',
      subHeader: '',
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }
 

  ionViewWillEnter(){
    this.leafletMap().then(() =>{
      setTimeout(() => {
        this.map.invalidateSize(true) 
      }, 200);
    })
  }

  ionViewWillLeave() {
    this.map.remove();
  }


}
