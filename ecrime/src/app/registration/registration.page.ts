import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router'; 
import { RequestService } from '../services/request.service'
import { formatDate } from '@angular/common';
import { Toast } from '@ionic-native/toast/ngx';
import { LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {
	loading:any
  userDetails = {
		firstName: '',
		lastName: '',
		bdate: '',
		email: '',
		gender: '',
		password: '',
		cpassword: '',
		contact: '',
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
		],
		'cpassword': [
		  { type: 'required', message: 'password is no match.' },
		  { type: 'minLength', message: 'password length must be longer or equal to 6 character.' },
		  { type: 'maxLength', message: 'password length must be lower or equal to 30 character.' },
		  { type: 'pattern', message: 'Please enter a comfirm password' }
		],
	  }

	  public option: string
  public emailPasswordForm: FormGroup; 


  constructor(
    public formBuilder: FormBuilder,
    private router: Router, 
	private loadingController: LoadingController,
	private request: RequestService,
	private toast: Toast
  ) {

	this.emailPasswordForm = this.formBuilder.group({
		password: new FormControl('', Validators.compose([
		  Validators.required,
		  Validators.minLength(6),
		  Validators.maxLength(30),
		  Validators.pattern('^[a-zA-Z0-9!@#$%^&*()_+-=]*$')
  
		])),
		firstName: new FormControl('', Validators.compose([
		  Validators.required,
		  Validators.minLength(1),
		  Validators.maxLength(30),
  
		])),
		lastName: new FormControl('', Validators.compose([
		  Validators.required,
		  Validators.minLength(1),
		  Validators.maxLength(30),
  
		])),

		gender: new FormControl('', Validators.compose([
			Validators.required,
			Validators.minLength(1),
			Validators.maxLength(30),
	
		  ])),


		bdate: new FormControl('', Validators.compose([
			Validators.required,
			Validators.minLength(1),
			Validators.maxLength(30),
	
		  ])),

		  contact: new FormControl('', Validators.compose([
			Validators.required,
			Validators.minLength(1),
			Validators.maxLength(30),
	
		  ])),
		//for the comfirm password
		cpassword: new FormControl('', Validators.compose([
		  Validators.required,
		  Validators.minLength(6),
		  Validators.maxLength(30),
		  Validators.pattern('^[a-zA-Z0-9!@#$%^&*()_+-=]*$')
		])),
  
		// for the email requrire
		email: new FormControl('', Validators.compose([
		  Validators.required,
		  Validators.minLength(4),
		  Validators.maxLength(30),
		  Validators.pattern('^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$')
  
		]))
	  });

   }

 

  ngOnInit() {
  }

  signUp() {

	// this.register(this.userDetails)
	
	 this.presentLoading().then(() =>{
		formatDate(this.userDetails.bdate, 'yyyy-MM-dd', 'en');
	let data = {
		 
        'fname': this.userDetails.firstName,
        'lname': this.userDetails.lastName,
        'email': this.userDetails.email,
        'contact': this.userDetails.contact,
        'bdate':  formatDate(this.userDetails.bdate, 'yyyy-MM-dd', 'en'),
        'gender': this.userDetails.gender,
    
        'password': this.userDetails.password,
     
	}

	 
	this.request.postData("register.php",data).subscribe(res =>{
		 this.loading.dismiss()
		let result = res.json()
		if(result.message == "success"){
			localStorage.setItem("id",result.id)
			localStorage.setItem("step","2")
			this.showToast("success")
			 console.log(result)
			this.router.navigate(["validid"],{replaceUrl: true})
		}else{
			this.showToast("Something went wrong. please try again later")
		}
	},err =>{
        this.loading.dismiss()
        this.showToast("Something went wrong. please try again later")
      })
	 })
	
  }
  async register(userDetails) {
    if (userDetails.password !== userDetails.cpassword) {
	  //showing the toast notification
	  console.log(userDetails)
     
	  this.showToast("Hi, Your password don't match")
    } else if (userDetails.password == userDetails.cpassword) {
    //   this.router.navigateByUrl('/tabs')
    }
  }


  async presentLoading() {
    this.loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Submitting',
      duration: 2000
    });
    await this.loading.present();

   
  }
 

  showToast(message){
    this.toast.show(message, '5000', 'center').subscribe(
      toast => {
        console.log(toast);
      }
    );
  }
  

  back() {
     
  }

  

}
