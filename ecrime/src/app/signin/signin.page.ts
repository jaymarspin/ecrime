import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { RequestService } from '../services/request.service'
import { FormBuilder } from '@angular/forms';
 
import {GlobalService} from '../services/global.service'
@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {
  userDetails = {
		 
		email: '',
	 
		password: '',
		 
    }
    
    error_messages = {
      'email': [
        { type: 'required', message: 'Email is required.' },
        { type: 'minLength', message: 'Email length must be longer or equal to 6 character.' },
        { type: 'maxLength', message: 'Email length must be lower or equal to 50 character.' },
        { type: 'pattern', message: 'Please enter a valid email' }
      ],
      'password': [
        { type: 'required', message: 'password is required.' },
        { type: 'minLength', message: 'password length must be longer or equal to 6 character.' },
        { type: 'maxLength', message: 'password length must be lower or equal to 30 character.' },
        { type: 'pattern', message: 'Please enter a valid password' }
      ]
    }

    email:any

    password:any
  constructor(private global: GlobalService,private router: Router,private request: RequestService,public formBuilder: FormBuilder) { }

  ngOnInit() {
  }

  register(){
    this.router.navigate(['registration'])
  }
  result:any
  signin(){
    let data = {
      email: this.email,
      password: this.password
    }
    // console.log(data)
    this.request.postData("login.php",data).subscribe(res =>{
     
      this.result = res.json();
      console.log(this.result)
      if(this.result.id != "0"){
        localStorage.setItem("id",this.result.id)
        if(this.result.approved == "1"){
          localStorage.setItem("step","5")
        }else{
          localStorage.setItem("step","4")
        }
        this.router.navigate(['splash'])
      }
      // if(this.result.message == "success"){
         
      //   this.storage.set('user_id', this.result.id);
      //   this.storage.set('step', 1);
      //   this.global.userid = parseInt(this.result.id)
      //   this.router.navigate(["profile-pic"])
      // }else{
      //   alert("bad")
      // }
    })

  }

}
