import { Component, OnInit } from '@angular/core';
import * as l from 'leaflet';
import {GlobalService } from '../services/global.service'
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  map: l.Map;
  constructor(public global: GlobalService) { }

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
  submit(){
    console.log(this.marker._latlng)
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
