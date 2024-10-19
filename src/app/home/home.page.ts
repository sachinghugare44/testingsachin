import { Component } from '@angular/core';
import { HttpService } from '../http.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage  {
  myForm:any
  registerform:any

  constructor  (private route:Router, private fb:FormBuilder, private http:HttpService) {
   
   }
  
  ngOnInit() {
   this.getallpartlist();
  }
  partlist:any;
  logindata:any;
logout(){
  let obj={}
  this.http.HttpRequest('POST','/logout/',obj).subscribe((data:any)=>{
    this.logindata=data;
    console.log(data)
    this.route.navigate(['/login'])
    localStorage.clear();
    alert(this.logindata?.status);
  })
}

getallpartlist(){
  this.http.HttpRequest('GET','/party/',{}).subscribe((data:any)=>{
    this.partlist=data;
    console.log(data)
    
  })
}
deletdata:any;
deletepartdeyalsbyid(value:any){
  this.http.HttpRequest('DELETE','/party/?id='+value,{}).subscribe((data:any)=>{
    this.deletdata=data;
    console.log(data)
    this.getallpartlist();
    alert(this.deletdata.msg);
  })
}

onclickopendit(value:any){
  this.route.navigate(['/home/view-vendor-details/'+ value])
}
}

