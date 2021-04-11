import { Component, OnInit } from '@angular/core';
import * as l from 'leaflet';
import {GlobalService } from '../services/global.service'
@Component({
  selector: 'app-mapping',
  templateUrl: './mapping.page.html',
  styleUrls: ['./mapping.page.scss'],
})
export class MappingPage implements OnInit {
  maper: l.Map;
  constructor(public global: GlobalService) { }

  ngOnInit() {
    this.leafletMap().then(() =>{
      this.maper.invalidateSize(true) 
    })
  }
  customIcon = l.icon({
    iconUrl: '../../../../assets/mapmarker/warning.png',
    // shadowUrl: '../../../../assets/mapmarker/marker-shadow.png',
    iconSize:     [38, 45],
     
    popupAnchor: [0, 0]
    });

  async leafletMap() {
    // In setView add latLng and zoom
    this.maper = new l.Map('maper').setView([28.644800, 77.216721], 10);
    l.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: ' '
    }).addTo(this.maper);

    // l.marker([this.global.address.lat, this.global.address.lng],{icon: this.customIcon}).addTo(this.map).on('click', (e) =>{
       
    // }).bindPopup("Drag me to where the crime happened").openPopup();


    

  
  }

  ionViewWillEnter(){
   
  }

  ionViewWillLeave() {
    this.maper.remove();
  }


}
