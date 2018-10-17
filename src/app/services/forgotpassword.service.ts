import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ForgotpasswordService {

  uri="http://localhost:4000/forgotpassword";

  constructor(private http:HttpClient) { }

  forgotPassword(email) : Observable<any>{
    return this.http.post(`${this.uri}/forgotpassword`,email)
  }

}
