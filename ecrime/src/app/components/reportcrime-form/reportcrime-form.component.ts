import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { RequestService } from '../../services/request.service'
@Component({
  selector: 'app-reportcrime-form',
  templateUrl: './reportcrime-form.component.html',
  styleUrls: ['./reportcrime-form.component.scss'],
})
export class ReportcrimeFormComponent implements OnInit {

  constructor(private camera: Camera,public request: RequestService) { }

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
    let data = {
      crime_type: "awawdaw",
      description: "adawdawda"

    }
    this.request.postData("add-crime.php",data).subscribe(res =>{
      console.log(res)
    })
  }



}
