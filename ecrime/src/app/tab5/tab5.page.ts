import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { GlobalService} from '../services/global.service'
import { RequestService} from '../services/request.service'  
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { Router } from '@angular/router'
@Component({
  selector: 'app-tab5',
  templateUrl: './tab5.page.html',
  styleUrls: ['./tab5.page.scss'],
})
export class Tab5Page implements OnInit {
  user:any
  constructor(private router: Router,private photoViewer: PhotoViewer,public request: RequestService,public global: GlobalService,public loadingController: LoadingController) {
     
  }
  ngOnInit() {
    this.request.getData("get-user.php?id="+localStorage.getItem("id")).subscribe(res =>{
      console.log(res)
      this.user = res.json()
    })
  }

  logout(){
    localStorage.clear()
    this.router.navigate([""])
  }

}
