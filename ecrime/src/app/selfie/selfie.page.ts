import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';  
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { RequestService } from '../services/request.service'
import { LoadingController } from '@ionic/angular';
import { GlobalService} from '../services/global.service'
import { AlertController } from '@ionic/angular';
import { Base64 } from '@ionic-native/base64/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { Router } from '@angular/router'
import { Toast } from '@ionic-native/toast/ngx';
@Component({
  selector: 'app-selfie',
  templateUrl: './selfie.page.html',
  styleUrls: ['./selfie.page.scss'],
})
export class SelfiePage implements OnInit {
  disabled:any
 

  imgsrc:any
  url:any
  base64image:any
  

  loading:any
  constructor(private toast: Toast,private router: Router,private location: Location,private photoViewer: PhotoViewer,private webview: WebView,private filePath: FilePath,private base64: Base64,public alertController: AlertController,public global: GlobalService,public loadingController: LoadingController,private camera: Camera,public request: RequestService) {
    this.disabled = false
     
   }

  ngOnInit() {
     
  }
  back(){
    this.location.back()

  }
  save(){

    this.presentLoading().then(() =>{
      let data = {
        id: localStorage.getItem("id"),
        selfie: this.base64image,
        
      }
      console.log(data)
      this.request.postData("add-selfie.php",data).subscribe(res =>{
         console.log(res)
        let result = res.json()
        if(result.message == 'success'){
          localStorage.setItem("step","4")
           
          this.showToast("successfully submitted")
          
          this.router.navigate(["tabs",],{replaceUrl: true})
        }else{
          this.showToast("Something went wrong. please try again later")
        }
      },err =>{
        this.loading.dismiss()
        this.showToast("Something went wrong. please try again later")
      })
    })
    

  }
   

  viewphoto(){
    this.photoViewer.show(this.url);
    
  }
 
  
  async takephoto(){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      cameraDirection: this.camera.Direction.FRONT,

    }
    
    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64 (DATA_URL):
     
     this.filePath.resolveNativePath(imageData)
  .then(filePath =>{
    console.log(filePath)
    

    
    
    this.url = filePath
    this.imgsrc = this.webview.convertFileSrc(filePath)
  })
  .catch(err => console.log(err));
     
     this.base64.encodeFile(imageData).then((base64File: string) => {
       
      this.base64image = base64File
      
    }, (err) => {
      console.log(err);
    });
    }, (err) => {
     // Handle error
    });
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Submitting',
      duration: 2000
    });
    await this.loading.present();

   
  }

  showToast(message){
    this.toast.show(message, '5000', 'center').subscribe(
      toast => {
        console.log(toast);
      }
    );
  }
 
}
