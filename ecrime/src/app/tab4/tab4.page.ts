import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router' 
import { RequestService} from '../services/request.service'
import { GlobalService} from '../services/global.service'
@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  requestnum:any
  constructor(private router: Router,public request: RequestService) { }

  ngOnInit() {
    
  }

  switchtab(url){
    this.getRequest()
    this.router.navigate(["tabs/tab4/"+url])
  }

  getRequest(){
    // 
    this.request.getData("get-request.php?id="+localStorage.getItem("id")).subscribe(res =>{
      console.log(res)
      this.requestnum = res.json().requests
    })
  }

  ionViewWillEnter() { 
    this.getRequest()
 
 
  }

  ionViewWillLeave() {
    
  }

  

}
