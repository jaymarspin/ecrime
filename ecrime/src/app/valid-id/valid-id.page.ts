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
  selector: 'app-valid-id',
  templateUrl: './valid-id.page.html',
  styleUrls: ['./valid-id.page.scss'],
})
export class ValidIDPage implements OnInit {
  disabled:any
  backurl:any
  fronturl:any

  imgsrcfront:any
  imgsrcback:any
  base64imagefront:any
  base64imageback:any
  backid:any

  loading:any
  constructor(private toast: Toast,private router: Router,private location: Location,private photoViewer: PhotoViewer,private webview: WebView,private filePath: FilePath,private base64: Base64,public alertController: AlertController,public global: GlobalService,public loadingController: LoadingController,private camera: Camera,public request: RequestService) {
    this.disabled = false
    this.backid = false
   }

  ngOnInit() {
    // localStorage.clear()
  }
  back(){
    this.location.back()

  }
  save(){
    this.presentLoading().then(() =>{
      let data = {
        id: localStorage.getItem("id"),
        front: this.base64imagefront,
        back: this.base64imageback
      }
      console.log(data)
      this.request.postData("add-validid.php",data).subscribe(res =>{
         console.log(res)
         this.loading.dismiss()
        let result = res.json()
        if(result.message == 'success'){
          localStorage.setItem("step","3")
          this.showToast("successfully submitted")
          
          this.router.navigate(["selfie",],{replaceUrl: true})
        }else{
          this.showToast("Something went wrong. please try again later")
        }
      },err =>{
        this.loading.dismiss()
        this.showToast("Something went wrong. please try again later")
      })
    })
    

  }
  scanfront(){
    this.backid = false
    this.scan()
  }
  scanback(){
    this.backid = true
    this.scan()
  }

  viewphoto(bol){
    if(bol == true){
      this.photoViewer.show(this.fronturl);
    }else{
      this.photoViewer.show(this.backurl);
    }
    
  }
 
  
  async scan(){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    
    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64 (DATA_URL):
     
     this.filePath.resolveNativePath(imageData)
  .then(filePath =>{
    console.log(filePath)
    

    
    if(this.backid == false){
      this.fronturl = filePath
      this.imgsrcfront = this.webview.convertFileSrc(filePath)
    }else{
      this.backurl = filePath
      this.imgsrcback = this.webview.convertFileSrc(filePath)
    }
  })
  .catch(err => console.log(err));
     
     this.base64.encodeFile(imageData).then((base64File: string) => {
      if(this.backid == false){
        this.base64imagefront = base64File;
      }else{
        this.base64imageback = base64File
      }
      
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
