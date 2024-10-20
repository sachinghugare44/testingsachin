import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../http.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  myForm:any
  registerform:any

  constructor  (private route:Router, private fb:FormBuilder, private http:HttpService) {
    this.myForm=this.fb.group({
    username:['',Validators.required],
    password:['',Validators.required],
    // mobile:['',Validators.required],

    })
  
   }
  
  ngOnInit() {
   
  }
  login:boolean=true
  register:boolean=false
  submit(){

  }
  backtologin(f1:any){
    console.log(f1)
    if(f1==false){
      this.register=false
      this.login=true
    }
    else{
      this.login=false
      this.register=true
    }
  }
  logindata:any
  submittied=false
  submittied2=false
  onSubmit(myForm:any){
    let obj={
      username:myForm.value.username,
      password:myForm.value.password
    }
    console.log(obj);
    this.submittied=true;
    if(myForm.valid){
      this.http.HttpRequest('POST','/login/',obj).subscribe((data:any)=>{
        this.logindata=data;
        console.log(data)
        if( this.logindata){

        this.myForm.reset();
          this.route.navigate(['/home']);
          localStorage.setItem('Authorization','Token '+this.logindata.token)
          alert('Login Successfully...!')
         

        



        }
       
      })
    }
    else{
          console.log(this.myForm.value)
    }


  }


  get loginFormControl() {
    return this.myForm.controls;
  }

}
