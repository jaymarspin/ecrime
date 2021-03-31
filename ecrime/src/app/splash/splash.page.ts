import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
})
export class SplashPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    if(localStorage.getItem("id")){
       
      if(localStorage.getItem("step") == "2"){
        this.router.navigate(["validid"],{replaceUrl: true})
      }else if(localStorage.getItem("step") == "3"){
        this.router.navigate(["selfie"],{replaceUrl: true})
      }else if(localStorage.getItem("step") == "4"){
        this.router.navigate(["approval"],{replaceUrl: true})
      }else if(localStorage.getItem("step") == "5"){
        this.router.navigate(["tabs"],{replaceUrl: true})
      }
    }else{
      this.router.navigate(["registration"],{replaceUrl: true})
    }
  }

}
