import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AddtocartService {

  uri = "http://localhost:4000/addtocart";

  constructor(private http:HttpClient) { }

  addCart(items) : Observable<any>{
    return this.http.post(`${this.uri}/addCart`,items)
  }

  getCart(items) : Observable<any>{
    return this.http.get(`${this.uri}/getCart/${items}`)
  }
 
  addcartItem(item_details,item_id) : Observable<any>{
    const obj={
      item_details:item_details,
      item_id:item_id
    }
    return this.http.post(`${this.uri}/addcartitem/`,obj)
  }

  deletecartItem(item,user_id) : Observable<any>{
    const obj={
      item:item,
      user_id:user_id
    }
    return this.http.post(`${this.uri}/deletecartItem`,obj)
  }

}