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

  async leafletMap() {
    // In setView add latLng and zoom
    this.map = new l.Map('mapId').setView([28.644800, 77.216721], 10);
    l.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: ' '
    }).addTo(this.map);

    l.marker([this.global.address.lat, this.global.address.lng],{icon: this.customIcon}).addTo(this.map).on('click', (e) =>{
       
    }).bindPopup("Drag me to where the crime happened").openPopup();


    

  
  }

  ionViewWillEnter(){
    this.leafletMap().then(() =>{
      this.map.invalidateSize(true) 
    })
  }

  ionViewWillLeave() {
    this.map.remove();
  }


}
