import { Component,OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import {ReportcrimeFormComponent} from '../components/reportcrime-form/reportcrime-form.component'
import { RequestService} from '../services/request.service'
import { GlobalService} from '../services/global.service'
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{
  loading:any
  myreports:any
  constructor(private loadingController: LoadingController,public photoViewer: PhotoViewer,public global: GlobalService,public request:RequestService,public popoverController: PopoverController) {
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
      console.log(e)
    })
  }
 

  async presentPopover(ev: any) {
    console.log(ev)
    const popover = await this.popoverController.create({
      component: ReportcrimeFormComponent,
      cssClass: 'my-custom-class',
      event: ev,
      translucent: true
    });
    return await popover.present();
  }
 ngOnInit(){
   this.presentLoading("loading...").then(() =>{
    this.getCrimes()
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
