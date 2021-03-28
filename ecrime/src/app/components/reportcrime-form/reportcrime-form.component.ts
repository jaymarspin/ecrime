import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { RequestService } from '../../services/request.service'
import { LoadingController } from '@ionic/angular';
import { GlobalService} from '../../services/global.service'
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-reportcrime-form',
  templateUrl: './reportcrime-form.component.html',
  styleUrls: ['./reportcrime-form.component.scss'],
})
export class ReportcrimeFormComponent implements OnInit {
  loading:any
  crimetype:any
  description:any
  constructor(public alertController: AlertController,public global: GlobalService,public loadingController: LoadingController,private camera: Camera,public request: RequestService) { }

  ngOnInit() {}

  takephoto(){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    
    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64 (DATA_URL):
     let base64Image = 'data:image/jpeg;base64,' + imageData;
     console.log(base64Image)
    }, (err) => {
     // Handle error
    });
  }

  submit(){
    console.log(this.global.address)
    let data = {
      crime_type: this.crimetype,
      description: this.description,
      lat: this.global.address.lat,
      lng: this.global.address.lng

    }
    this.request.postData("add-crime.php",data).subscribe(res =>{
       console.log(res)
      console.log(res.json())
      let result = res.json()
      if(result.message == 'success'){
        this.presentAlert()
      }
    })
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Success',
      subHeader: '',
      message: 'Youre query is now on process',
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




}
