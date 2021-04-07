import { Component, OnInit } from '@angular/core';
import { RequestService } from '../services/request.service'
import { LoadingController } from '@ionic/angular';
import { GlobalService} from '../services/global.service'
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-addtrack',
  templateUrl: './addtrack.component.html',
  styleUrls: ['./addtrack.component.scss'],
})
export class AddtrackComponent implements OnInit {
  trackingcode:any
  loading:any
  constructor(public loadingController: LoadingController,public alertController: AlertController,public request: RequestService,public global: GlobalService) { }

  ngOnInit() {}


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


  save(){
    if(this.trackingcode){
      this.presentLoading().then(() =>{
        let data = {
          id: localStorage.getItem("id"),
          tracking_code: this.trackingcode
        }
        console.log(data)
        this.request.postData("add-track.php",data).subscribe(res =>{
           
          this.loading.dismiss()
          let result = res.json()
          if(result.message == 'success'){
            delete(this.trackingcode)
            this.presentAlert("Success! Please wait for his/her to accept")
          }else{
            this.presentAlert(result.message)
          }
        },err =>{
          this.presentAlert(err)
          this.loading.dismiss()
        })
      })
    }else{
      this.presentAlert("Please Complete the fields")
    }
    
    
  }

}
