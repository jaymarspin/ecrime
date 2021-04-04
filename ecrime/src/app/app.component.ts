import { Component } from '@angular/core';
import { FirebaseX } from '@ionic-native/firebase-x/ngx';
import { RequestService } from './services/request.service'
import { LoadingController } from '@ionic/angular';
import { GlobalService} from './services/global.service'
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  
  constructor(private firebaseX: FirebaseX,public request: RequestService) {
    if(localStorage.getItem("id")){
    this.firebaseX.getToken()
  .then(token => {
    console.log(`The token is ${token}`)
    
      let data = {
        id: localStorage.getItem("id"),
        token: token
      }
      this.request.postData("save_fcm_token.php",data).subscribe(res =>{
        console.log(res)
      })
    
    
  }) // save the token server-side and use it to push notifications to this device
  .catch(error => console.error('Error getting token', error));

this.firebaseX.onMessageReceived()
  .subscribe(data => console.log(`User opened a notification ${data}`));

this.firebaseX.onTokenRefresh()
  .subscribe((token: string) => console.log(`Got a new token ${token}`));
    
  }

}
}
