import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/http.service';

@Component({
  selector: 'app-view-vendor-details',
  templateUrl: './view-vendor-details.component.html',
  styleUrls: ['./view-vendor-details.component.scss'],
})
export class ViewVendorDetailsComponent  implements OnInit {

  adddetailsForm: any;

  constructor(private route:Router,private fb: FormBuilder,private http:HttpService, private actiroute:ActivatedRoute) {
    this.adddetailsForm = this.fb.group({
      name: [],
      company_name: [[], Validators.required],
      mobile_no: [[],Validators.required],
      telephone_no: [[]],
      whatsapp_no: [],
      email: [[],Validators.email],
      remark: [],
      login_access:  [Validators.required],
      date_of_birth: [],
      anniversary_date: [],
      gstin: [],
      pan_no: [],
      apply_tds: [ Validators.required],
      credit_limit: [Validators.required],
         });
  }
  venddorid:any;
  ngOnInit(): void {
    this.venddorid = this.actiroute.snapshot.paramMap.get('id');
    if(this.venddorid>0){
      this.getvendordetailsbyid();
    }
  }
  vendorData:any
  getvendordetailsbyid(){
    this.http.HttpRequest('GET','/party/?id='+this.venddorid,{}).subscribe((data:any)=>{
     let vendorData=data;
      console.log(data)

      if(vendorData){
        this.adddetailsForm.controls.name.setValue(vendorData.name);
        this.adddetailsForm.controls.company_name.setValue(vendorData.company_name);
        this.adddetailsForm.controls.mobile_no.setValue(vendorData.mobile_no);
        this.adddetailsForm.controls.telephone_no.setValue(vendorData.telephone_no);
        this.adddetailsForm.controls.whatsapp_no.setValue(vendorData.whatsapp_no);
        this.adddetailsForm.controls.email.setValue(vendorData.email);
        this.adddetailsForm.controls.remark.setValue(vendorData.remark);
        this.adddetailsForm.controls.login_access.setValue(vendorData.login_access);
        this.adddetailsForm.controls.date_of_birth.setValue(vendorData.date_of_birth);
        this.adddetailsForm.controls.anniversary_date.setValue(vendorData.anniversary_date);
        this.adddetailsForm.controls.gstin.setValue(vendorData.gstin);
        this.adddetailsForm.controls.pan_no.setValue(vendorData.pan_no);
        this.adddetailsForm.controls.apply_tds.setValue(vendorData.apply_tds);
        this.adddetailsForm.controls.credit_limit.setValue(vendorData.credit_limit);
      }
     
    })
  }
  onSubmit() {
    if (this.adddetailsForm.valid) {
      const formData = this.adddetailsForm.value;  // Get the form data

      let obj = {
        name: formData.name,
        company_name: formData.company_name,
        mobile_no: formData.mobile_no,
        telephone_no: formData.telephone_no,
        whatsapp_no: formData.whatsapp_no,
        email: formData.email,
        remark: formData.remark,
        login_access: formData.login_access,
        date_of_birth: formData.date_of_birth,
        anniversary_date: formData.anniversary_date,
        gstin: formData.gstin,
        pan_no: formData.pan_no,
        apply_tds: formData.apply_tds,
        credit_limit: formData.credit_limit
      };

      console.log('Submission Object:', obj);
       if(this.venddorid>0){
      this.http.HttpRequest('PATCH','/party/?id='+this.venddorid,obj).subscribe((data:any)=>{
        console.log(data);
        this.route.navigate(['/home'])
        this.getvendordetailsbyid();

        alert("Successfully Details Updated...!")
      })
    }
    else{
      this.http.HttpRequest('POST','/party/',obj).subscribe((data:any)=>{
        console.log(data);
        this.getvendordetailsbyid();
        this.route.navigate(['/home'])
        alert("New Baisc Details added...!")
      })
    }
      // You can now send this object to your backend
    } else {
      console.log('Form is invalid');
    }
  }




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

 
}
