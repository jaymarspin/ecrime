import { Component, OnInit } from '@angular/core'; 
import { RequestService } from '../services/request.service'
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { AlertController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-request',
  templateUrl: './request.page.html',
  styleUrls: ['./request.page.scss'],
})
export class RequestPage implements OnInit {
  requests:any
  loading:any
  constructor(private loadingController: LoadingController, public alertController: AlertController,private photoViewer: PhotoViewer,public request: RequestService) {
    this.requests = Array()
   }

  ngOnInit() {

  }

  getRequests(){
    this.presentLoading().then(() =>{
      this.requests = Array()
    this.request.getData("get-requests.php?id="+localStorage.getItem("id")).subscribe(res =>{
      this.loading.dismiss()
      console.log(res.json())
      let result = res.json()
      for(var i =0;i < result.length;i++)
      this.requests.push({
        user: result[i].user,
        date_created: result[i].date_created,
        id: result[i].id
      })
    },err =>{
      this.loading.dismiss()
      this.presentAlert(err)
    })
    })
    
  }

  ionViewWillEnter() { 
   
    this.getRequests()

 
 
  }

  ionViewWillLeave() {
    
  }

  viewphoto(url){
    this.photoViewer.show(this.request.server+url);
  }

  async presentAlertConfirm(message,id,role) {
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
            if(role == 'allow'){
              this.allowlocate(id)
            }else{
              this.delete(id)
            }
           
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

  allowlocate(id){
    this.presentLoading().then(() =>{
      let data = {
        id: id
      }
       this.request.postData("allow-locate.php",data).subscribe(res =>{
         this.loading.dismiss()
         let result = res.json()
         if(result.message == 'success'){ 
          this.getRequests()
          this.presentAlert("success")
         }else{
            this.presentAlert("Something went wrong")
         }
       },err =>{
        this.loading.dismiss()
        this.presentAlert(err)
       })
    })
    

  }

  delete(id){
    this.presentLoading().then(() =>{
      let data = {
        id: id
      }
       this.request.postData("delete-request.php",data).subscribe(res =>{
         this.loading.dismiss()
         let result = res.json()
         if(result.message == 'success'){ 
          this.getRequests()
          this.presentAlert("success")
         }else{
            this.presentAlert("Something went wrong")
         }
       },err =>{
        this.loading.dismiss()
        this.presentAlert(err)
       })
    })
  }

}
// get-requests.php