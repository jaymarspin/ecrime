import { Component,OnInit } from '@angular/core';
import * as l from 'leaflet';
import { LoadingController } from '@ionic/angular';
import { GlobalService} from '../services/global.service'
import { RequestService} from '../services/request.service'
import { AlertController } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { Toast } from '@ionic-native/toast/ngx';
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
  stationresult:any
  humanresult:any
  mylabel:string
  crimes:any
  constructor(private toast: Toast,private photoViewer: PhotoViewer,private callNumber: CallNumber,private geolocation: Geolocation,public alertController: AlertController,public request: RequestService,public global: GlobalService,public loadingController: LoadingController) {
     this.mylabel = "Here where you are right now"
  }

  ngOnInit(){
      localStorage.setItem("open","0")
      var open = (parseInt(localStorage.getItem("open")) + 1)

      if(open <= 5){
        localStorage.setItem("open",""+open)
        this.presentAlert("here is the crime mapping")
        console.log(open)
      }
      
  
  }

  async presentAlert(message) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Info',
      subHeader: '',
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

  async getCrimes(load){
    if(load == 0){
      this.request.getData("get-crimes.php?lat="+this.global.address.lat+"&lng="+this.global.address.lng+"&id="+localStorage.getItem("id")).subscribe(res =>{
        console.log(res.json())
         let result = res.json()
         
         this.loading.dismiss()
         for(var i =0;i < result.length;i++){
          this.markerdroper(result[i])
           
         }
         this.viewtoast()
      },err =>{
        this.presentAlert(err)
        this.loading.dismiss()
      })
    }else{
      this.presentLoading("loading...").then(() =>{
       
        this.request.getData("get-crimes.php?lat="+this.global.address.lat+"&lng="+this.global.address.lng+"&id="+localStorage.getItem("id")).subscribe(res =>{
          console.log(res)
           let result = res.json()
           this.loading.dismiss()
           for(var i =0;i < result.length;i++){
            this.markerdroper(result[i])
            
           }
           this.viewtoast()
        },err =>{
          this.presentAlert(err)
          this.loading.dismiss()
        })
      })
    }
    
  }

  markerdroper(crime){
     
    
      
     let x = l.marker([crime.lat,crime.lng],{icon: this.customIcon,id: crime.id,crime: crime}).addTo(this.map).on('click', (e) =>{
      
      delete(this.stationresult)
      delete(this.humanresult)
        
       
      this.crimeresult = e.target.options.crime
     })

     if(parseFloat(crime.distance) <= 0.5){
       
       
      this.map.setView([crime.lat,crime.lng],20);
      x.bindPopup("Warning! A crime happened near where you are!(500meter radius)").openPopup()
    }
    
  }


  policemarker(station){
    l.marker([station.lat,station.lng],{icon: this.policeIcon,id: station.id,station: station}).addTo(this.map).on('click', (e) =>{
      
      delete(this.crimeresult)
      delete(this.humanresult)
       
      this.stationresult = e.target.options.station
     })
  }

  humanMarker(human){
    // console.log(human.tracked.location.lat)
    l.marker([human.tracked.location.lat,human.tracked.location.lng],{icon: this.humanIcon,id: human.id,human: human}).addTo(this.map).on('click', (e) =>{
      delete(this.stationresult)
      delete(this.crimeresult)
       
      this.humanresult = e.target.options.human
      // console.log(this.humanresult)
     })
  }

 async getStations(){
    this.presentLoading("loading...").then(() =>{
      
      this.request.getData("get-stations.php?lat="+this.global.address.lat+"&lng="+this.global.address.lng).subscribe(res =>{
        console.log(res)
         let result = res.json()
         this.loading.dismiss()
         for(var i =0;i < result.length;i++){
          this.policemarker(result[i])
         }
         this.viewtoast()
      },err =>{
        this.presentAlert(err)
        this.loading.dismiss()
      })
    })
    
  }

  customIcon = l.icon({
    iconUrl: '../../../../assets/mapmarker/warning.png',
    // shadowUrl: '../../../../assets/mapmarker/marker-shadow.png',
    iconSize:     [38, 45],
     
    popupAnchor: [0, 0]
    });


    policeIcon = l.icon({
      iconUrl: '../../../../assets/mapmarker/police.png',
      // shadowUrl: '../../../../assets/mapmarker/marker-shadow.png',
      iconSize:     [38, 45],
       
      popupAnchor: [0, 0]
      });
      humanIcon = l.icon({
        iconUrl: '../../../../assets/mapmarker/icons8-street-view-48.png',
        // shadowUrl: '../../../../assets/mapmarker/marker-shadow.png',
        iconSize:     [38, 45],
         
        popupAnchor: [0, 0]
        });

        myicon = l.icon({
          iconUrl: '../../../../assets/mapmarker/icons8-marker-16.png',
          // shadowUrl: '../../../../assets/mapmarker/marker-shadow.png',
          iconSize:     [24, 24],
           
          popupAnchor: [0, 0]
          });


        
      
   
  async locator(){
    this.presentLoading("please wait we're locating you").then(() => {

    
      this.geolocation.getCurrentPosition().then((resp) => {
        // resp.coords.latitude
        // resp.coords.longitude
        this.global.address = {
          lat: resp.coords.latitude,
          lng: resp.coords.longitude
        }

        this.loading.dismiss()
    
      //  this.request.lat = e.latitude
      //  this.request.lng = e.longitude
      
        
        
  
          
          
         l.circle([this.global.address.lat, this.global.address.lng],{
            radius: 500,
            stroke: true,
            color: 'black',
            opacity: 1,
            weight: 1,
            fill: true,
            fillColor: "green",
            fillOpacity: 0.3
           }).addTo(this.map)

           l.marker([this.global.address.lat, this.global.address.lng],{icon: this.myicon}).addTo(this.map).on('click', (e) =>{
       
           }).bindPopup(this.mylabel).openPopup();
      
          //  l.marker([this.global.address.lat, this.global.address.lng],{icon: this.customIcon}).addTo(this.map).bindPopup("awdawd")
           this.map.invalidateSize(true) 

           setTimeout(() =>{
         
            this.getCrimes(0)
          },500)

          this.map.setView([this.global.address.lat, this.global.address.lng],16);
          //  l.marker([lat,lng],{icon: this.customIcon}).addTo(this.map).bindPopup("awd555awd")

          
          
            
        
           


          // this.loadMarkers()
       }).catch((error) => {
         console.log('Error getting location', error);
       });
        
  
      

        // this.map.locate({
        //   setView: true ,
          
        //   maxZoom: 20
        // }).on('locationfound', e =>{
          
        // },err =>{
        //   alert(err)
        //   this.loading.dismiss()
        // })
     

      
    }) 
  }

  async leafletMap() {
    // In setView add latLng and zoom
    this.map = new l.Map('mapId').setView([28.644800, 77.216721], 10);
    l.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: ' '
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
    delete(this.crimeresult)
    delete(this.stationresult)
    
    this.leafletMap().then(() =>{
      this.locator().then(() =>{
       
      })
    })  


 
 
  }

  ionViewWillLeave() {
    this.map.remove();
  }

  close(){
    delete(this.crimeresult)
    delete(this.stationresult)
    delete(this.humanresult)
  }

  async callstation(number){
    this.callNumber.callNumber(number, true)
  .then(res => console.log('Launched dialer!', res))
  .catch(err => console.log('Error launching dialer', err));
  }

  viewphoto(url){
    this.photoViewer.show(this.request.server+url);
  }
  async getFamilies(){
   
      this.presentLoading("loading...").then(() =>{
        
        this.request.getData("get-families.php?lat="+this.global.address.lat+"&lng="+this.global.address.lng+"&id="+localStorage.getItem("id")).subscribe(res =>{
          console.log(res.json())
           let result = res.json()
           this.loading.dismiss()
           for(var i =0;i < result.length;i++){
            this.humanMarker(result[i])
            
           }
           this.viewtoast()
        },err =>{
          this.presentAlert(err)
          this.loading.dismiss()
        })
      })
     
  }

  viewtoast(){
    this.toast.show(`successfully loaded!`, '5000', 'center').subscribe(
      toast => {
        console.log(toast);
      }
    );
  }

}
