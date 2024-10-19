import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HTTP } from '@ionic-native/http/ngx';
import { of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

 // alertobj = this.alertctrl.create({header:'Oops!',message:"Something went wrong please try aftersome time.", buttons:[{
// role:"confirm",
// text: "okay"
// }]})

constructor(

  private httpclient: HttpClient,

)
{
}



HttpRequest(method: 'POST' | 'GET' | 'DELETE' | 'PUT' | 'PATCH', url: string, requestBody: any): any
{

  url = "https://ap.greatfuturetechno.com" + url;
  console.log(url)
 // this.http.setDataSerializer('json');
//  let loader = this.loadctrl.create({message:'Loading...'});

  let headers:any
  if (localStorage.getItem('Authorization') !== null) {
    if (localStorage.getItem('Authorization') !== null) {
      headers = {
        accept: '*/*',
        Authorization: localStorage.getItem('Authorization'),
      };
      if (localStorage.getItem('Authorization') !== null) {
        headers.Authorization = localStorage.getItem('Authorization');
      }
      // if (localStorage.getItem('Org') !== null) {
      //   headers.sellerid = localStorage.getItem('Org');
      // }
      // if (localStorage.getItem('customerid') !== null) {
      //   headers.customerid = localStorage.getItem('customerid');
      // }

    }
  } else {

      headers = { accept: '*/*' };

  }


  if (method === 'POST') {
    console.log(headers);
    return this.httpclient.post(url, requestBody, { headers }).pipe(
      map((data: any) => {
        return data;
      }),
      catchError((err) => {
        console.log(err);
        return of(null);
      })
    );
  } else if (method === 'GET') {
    console.log(headers);
    return this.httpclient.get(url, { headers }).pipe(
      map((data: any) => {
        return data;
      }),
      catchError((err) => {
        console.log(err);
        return of(null);
      })
    );
  } else if (method === 'DELETE') {
    return this.httpclient.delete(url, { headers }).pipe(
      map((data: any) => {
        return data;
      }),
      catchError((err) => {
        console.log(err);
        return of(null);
      })
    );
  } else if (method === 'PUT') {
    return this.httpclient.put(url, requestBody, { headers }).pipe(
      map((data: any) => {
        return data;
      }),
      catchError((err) => {
        console.log(err);
        return of(null);
      })
    );
  } else if (method === 'PATCH') { // Added PATCH method here
    return this.httpclient.patch(url, requestBody, { headers }).pipe(
      map((data: any) => {
        return data;
      }),
      catchError((err) => {
        console.log(err);
        return of(null);
      })
    );
  }
  

}

}
