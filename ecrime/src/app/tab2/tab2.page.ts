import { Component,OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import {ReportcrimeFormComponent} from '../components/reportcrime-form/reportcrime-form.component'
import { RequestService} from '../services/request.service'
import { GlobalService} from '../services/global.service'

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{
  loading:any
  myreports:any
  constructor(public global: GlobalService,public request:RequestService,public popoverController: PopoverController) {
    this.myreports = Array()
  
  }

  getCrimes(){
    this.request.getData("get-crimes.php?lat="+this.global.address.lat+"&lng="+this.global.address.lng).subscribe(res =>{
      console.log(res)
      let result = res.json()
      for(var i =0;i < result.length;i++){
        this.myreports.push(result[i])
      }
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
   this.getCrimes()
 }


}
