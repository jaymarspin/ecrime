import { Component,OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import {ReportcrimeFormComponent} from '../components/reportcrime-form/reportcrime-form.component'
import { RequestService} from '../services/request.service'
import { GlobalService} from '../services/global.service'
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { LoadingController } from '@ionic/angular';
import {MapComponent} from '../map/map.component'
import { Router } from '@angular/router'
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{
  loading:any
  myreports:any
  constructor(private router :Router,private loadingController: LoadingController,public photoViewer: PhotoViewer,public global: GlobalService,public request:RequestService,public popoverController: PopoverController) {
    this.myreports = Array()
  
  }

  getCrimes(){
    this.myreports = Array()
    this.request.getData("get-myreported-crime.php?lat="+this.global.address.lat+"&lng="+this.global.address.lng+"&id="+localStorage.getItem("id")).subscribe(res =>{
      console.log(res.json())
      this.loading.dismiss()
      let result = res.json()
      for(var i =0;i < result.length;i++){
        this.myreports.push(result[i])
      }
    },err =>{
      this.loading.dismiss()
    })
  }

  openPopUp(){
    this.presentPopover(null).then((e) =>{
       
    })
  }
 

  async presentPopover(ev: any) {
     
    const popover = await this.popoverController.create({
      component: ReportcrimeFormComponent,
      cssClass: 'my-custom-class',
      event: ev,
      translucent: true
    });
     await popover.present();
     return popover.onDidDismiss().then(
      (data: any) => {
        if (data) {
           
          
          if(this.global.crimereported == "success"){
            
            this.openMap(ev)
            delete(this.global.crimereported)
            // delete(this.global.crime_id)
          }
          // trigger here the method dependind on the popover response
        }
      })
  }

  async openMap(ev: any) {
     
    const popover = await this.popoverController.create({
      component: MapComponent,
      cssClass: 'my-custom-class',
      event: ev,
      translucent: true
    });
    return await popover.present();
    
  }
 ngOnInit(){
   this.presentLoading("loading...").then(() =>{
    this.getCrimes()
    // this.router.navigate(["mapping"])
   })
   
 }

 viewphoto(url){
  this.photoViewer.show(this.request.server+url);
}



async presentLoading(message:string) {
  this.loading = await this.loadingController.create({
    cssClass: 'my-custom-class',
    message: message,
     
  });
  await this.loading.present();

  
}


}
