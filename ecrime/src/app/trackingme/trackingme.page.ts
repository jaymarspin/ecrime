import { Component, OnInit } from '@angular/core';
import { RequestService } from '../services/request.service'
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { AlertController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { CallNumber } from '@ionic-native/call-number/ngx';
@Component({
  selector: 'app-trackingme',
  templateUrl: './trackingme.page.html',
  styleUrls: ['./trackingme.page.scss'],
})
export class TrackingmePage implements OnInit {
  trackingme:any
  loading:any
  constructor(private callNumber: CallNumber,private loadingController: LoadingController, public alertController: AlertController,private photoViewer: PhotoViewer,public request: RequestService) {
    this.trackingme = Array()
   }
  ngOnInit() {
  }

  getTrackings(){
    this.presentLoading().then(() =>{
      this.trackingme = Array()
    this.request.getData("get-trackings-me.php?id="+localStorage.getItem("id")).subscribe(res =>{
      console.log(res.json())
      this.loading.dismiss()
      let result = res.json()
      for(var i =0;i < result.length;i++)
      this.trackingme.push({
        tracker: result[i].tracker,
        date_created: result[i].date_created,
        id: result[i].id
      })
    },err =>{
      this.loading.dismiss()
      this.presentAlert(err)
    })
    })
    
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
