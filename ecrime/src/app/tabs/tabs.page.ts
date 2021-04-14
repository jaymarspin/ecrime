import { Component, OnInit } from '@angular/core';
import { Tab1Page } from '../tab1/tab1.page'
import { Tab2Page } from '../tab2/tab2.page' 
import { Tab3Page } from '../tab3/tab3.page'
import { GlobalService} from '../services/global.service'
import { RequestService} from '../services/request.service'  
import { Router } from '@angular/router'
import { Shake } from '@ionic-native/shake/ngx';
import { Autostart } from '@ionic-native/autostart/ngx';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';
import { Toast } from '@ionic-native/toast/ngx';
import Swal from 'sweetalert2'
@Component({

  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit {
  tab1 = Tab1Page
  tab2 = Tab2Page
  tab3 = Tab3Page

  config:any = {
    sideMenu: 'left',
    shortSwipeDuration: 2000,
  };

  swipeable:any 
  constructor(public request: RequestService,private toast: Toast,private backgroundMode: BackgroundMode,private autostart: Autostart,private shake: Shake,private router : Router,public global: GlobalService) {
    this.swipeable = false
  }
  ngOnInit(){

    
 

   
    const watch = this.shake.startWatch(60).subscribe(() => {
      let data = {
        id: localStorage.getItem("id"),
        lat: this.global.address.lat,
        lng: this.global.address.lng
      }
      let timerInterval
      Swal.fire({
        title: 'alerting people nearby',
        html: '',
        timer: 2000,
        timerProgressBar: true,
        didOpen: () => {
          // Swal.showLoading()
          this.request.postData("add-emergency.php",data).subscribe(res =>{
            console.log(res)
          })
        },
        willClose: () => {
          clearInterval(timerInterval)
        }
      }).then((result) => {
        /* Read more about handling dismissals below */
        if (result.dismiss === Swal.DismissReason.timer) {
         alert("Emergency successfully broadcast")
        }
      })

      
      });
    
     
  }

  tabChange(e){
    // console.log(e)
  }
  activeTabIndexChange(e){
    console.log(e)
  }
  tabclick(bool){
    this.global.playvideo = bool
  }

  ionViewWillEnter() { 
    if(!localStorage.getItem("id")){
      this.router.navigate([""],{replaceUrl: true})
    }else{

      
    }
  }
}
