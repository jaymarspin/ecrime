import { Component, OnInit } from '@angular/core';
import {AddtrackComponent} from '../addtrack/addtrack.component'
import { PopoverController } from '@ionic/angular';
import { RequestService } from '../services/request.service'
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { AlertController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { CallNumber } from '@ionic-native/call-number/ngx';
@Component({
  selector: 'app-mytacking',
  templateUrl: './mytacking.page.html',
  styleUrls: ['./mytacking.page.scss'],
})
export class MytackingPage implements OnInit {
  mytracking:any
  loading:any
  constructor(private callNumber: CallNumber,private loadingController: LoadingController, public alertController: AlertController,private photoViewer: PhotoViewer,public request: RequestService,private popoverController: PopoverController) {
    this.mytracking = Array()
   }

  ngOnInit() {
    
  }

  getTrackings(){
    this.presentLoading().then(() =>{
      this.mytracking = Array()
    this.request.getData("get-trackings.php?id="+localStorage.getItem("id")).subscribe(res =>{
      console.log(res.json())
      this.loading.dismiss()
      let result = res.json()
      for(var i =0;i < result.length;i++)
      this.mytracking.push({
        tracked: result[i].tracked,
        date_created: result[i].date_created,
        id: result[i].id
      })
    },err =>{
      this.loading.dismiss()
      this.presentAlert(err)
    })
    })
    
  }
  async presentPopover(ev: any) {
    console.log(ev)
    const popover = await this.popoverController.create({
      component: AddtrackComponent,
      cssClass: 'my-custom-class',
      event: ev,
      translucent: true
    });
    return await popover.present();
  }

  
  async presentAlertConfirm(message,id) {
    console.log(id)
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirm!',
      message: message,
      buttons: [
        {
          text: 'Not Now',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: () => {
            console.log('Confirm Okay');
             
          }
        }
      ]
    });

    await alert.present();
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

  
  async presentLoading() {
    this.loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      duration: 2000
    });
    await this.loading.present();

   
  }
  viewphoto(url){
    this.photoViewer.show(this.request.server+url);
  }

  async callstation(number){
   
    this.callNumber.callNumber(number, true)
  .then(res => console.log('Launched dialer!', res))
  .catch(err => console.log('Error launching dialer', err));
  }
  ionViewWillEnter() { 
   
    this.getTrackings()

 
 
  }

  ionViewWillLeave() {
    
  }
}
