import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { loadDirective } from '@angular/core/src/render3/instructions';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  total :any
  // cartItemTotal : EventEmitter <any> = new EventEmitter();
  public cartTotalPrice: BehaviorSubject<number> = new BehaviorSubject<number>(this.total);

  uri = "http://localhost:4000/pay";

  constructor(private http : HttpClient) { }

  card(token,data,payment): Observable<any>{
    console.log(token,data,payment,"=============================")
    const obj={
      token:token,
      data:data,
      payment:payment
    }
    return this.http.post(`${this.uri}/charge`,obj);
  }

  defaultcard(token) : Observable<any>{
    let ran_id=1;
    const user=localStorage.getItem('user_id');
    const obj={
      token:token,
      ran_id:ran_id,
      user:user
    }
    return this.http.post(`${this.uri}/defaultcardtoken`,obj);
  }

  getCardInfo(user) : Observable<any>{
    return this.http.post(`${this.uri}/getcardinfo`,user)
  }

}