import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { RequestService } from '../../services/request.service'
import { LoadingController } from '@ionic/angular';
import { GlobalService} from '../../services/global.service'
import { AlertController } from '@ionic/angular';
import { Base64 } from '@ionic-native/base64/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';

@Component({
  selector: 'app-reportcrime-form',
  templateUrl: './reportcrime-form.component.html',
  styleUrls: ['./reportcrime-form.component.scss'],
})
export class ReportcrimeFormComponent implements OnInit {
  loading:any
  crimetype:any
  description:any
  base64image:any
  imgsrc:any
  uri:any
  constructor(private photoViewer: PhotoViewer,private webview: WebView,private filePath: FilePath,private base64: Base64,public alertController: AlertController,public global: GlobalService,public loadingController: LoadingController,private camera: Camera,public request: RequestService) { }

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
     this.uri = imageData
     this.filePath.resolveNativePath(imageData)
  .then(filePath =>{
    console.log(filePath)
    

    this.imgsrc = this.webview.convertFileSrc(filePath)
  })
  .catch(err => console.log(err));
     
     this.base64.encodeFile(imageData).then((base64File: string) => {
      
      this.base64image = base64File;
    }, (err) => {
      console.log(err);
    });
    }, (err) => {
     // Handle error
    });
  }

  viewphoto(){
    this.photoViewer.show(this.uri);
  }

  submit(){
    console.log(this.global.address)
    let data = {
      crime_type: this.crimetype,
      description: this.description,
      lat: this.global.address.lat,
      lng: this.global.address.lng,
      base64image: this.base64image

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
