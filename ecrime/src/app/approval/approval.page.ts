import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import {RequestService} from '../services/request.service'
import { GlobalService } from "../services/global.service"

@Component({
  selector: 'app-approval',
  templateUrl: './approval.page.html',
  styleUrls: ['./approval.page.scss'],
})
export class ApprovalPage implements OnInit {
  id:any
  constructor(private router: Router,public request: RequestService,public global: GlobalService) { }

  ngOnInit() {
     
    this.request.getData("get-approval.php?id="+localStorage.getItem("id")).subscribe(res =>{
       
      let result = res.json()
      console.log(res)
      if(result.approved == "1"){
        localStorage.setItem("step","5")
        
        this.router.navigate(["tabs"],{replaceUrl: true})
      }
    })
  }

  signout(){
    this.router.navigate([""],{replaceUrl: true})
    localStorage.clear()
  }

}
