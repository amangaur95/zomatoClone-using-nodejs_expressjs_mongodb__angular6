import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  uri = "http://localhost:4000/pay";
  constructor(private http : HttpClient) { }

  card(token,data,payment): Observable<any>{
    const obj={
      token:token,
      data:data,
      payment:payment
    }
    return this.http.post(`${this.uri}/charge`,obj);
  }
}