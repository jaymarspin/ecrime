import { Component, OnInit } from '@angular/core';
import { RequestService } from '../services/request.service'
import { LoadingController } from '@ionic/angular';
import { GlobalService} from '../services/global.service'
import { CallNumber } from '@ionic-native/call-number/ngx';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-crime-further',
  templateUrl: './crime-further.page.html',
  styleUrls: ['./crime-further.page.scss'],
})
@Pipe({
  name: 'safe'
})
export class CrimeFurtherPage implements OnInit {
  crimeresult
  stationresult:any
  loading:any
  play:any
  html:any
  src:any="https://www.youtube.com/embed/D-6yRDMxDMc"

  constructor(private sanitizer: DomSanitizer,private callNumber: CallNumber,private loadingController: LoadingController,private photoViewer: PhotoViewer,public request: RequestService,public global: GlobalService) { }

  ngOnInit() {
    console.log(this.global.crime)
    this.crimeresult = this.global.crime
    this.presentLoading("loading...").then(() =>{
      this.request.getData("get-near-station.php?lat="+this.crimeresult.crimeLocation.lat+"&lng="+this.crimeresult.crimeLocation.lng).subscribe(res =>{
        console.log(res.json())
        let result = res.json()
        this.stationresult = result
        this.loading.dismiss()
      })
    })
  }
  transform(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
  ionViewWillEnter() { 
    this.play = true
    this.global.playvideo = true
    
     
  }
 

  viewphoto(url){
    this.photoViewer.show(this.request.server+url);
  }

  async callstation(number){
    this.callNumber.callNumber(number, true)
  .then(res => console.log('Launched dialer!', res))
  .catch(err => console.log('Error launching dialer', err));
  }
  async presentLoading(message:string) {
    this.loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: message,
       
    });
    await this.loading.present();

    
  }

}
