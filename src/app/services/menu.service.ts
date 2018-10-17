import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  uri="http://localhost:4000/menu";

  constructor(private http:HttpClient) { }

  addmenu(menu) : Observable<any>{
    return this.http.post(`${this.uri}/addmenu`,menu);
  }

  getMenu(id) : Observable<any>{
    return this.http.get(`${this.uri}/getmenu/${id}`);
  }
  
  upadatemenuitem(data) :Observable<any>{
    return this.http.post(`${this.uri}/updatemenuitem`,data);
  }

  editFoodItem(id) :Observable<any>{
    return this.http.get(`${this.uri}/editfooditem/${id}`)
  }

  deleteMenuItem(id): Observable<any>{
    return this.http.get(`${this.uri}/deletemenuitem/${id}`)
  }
  
}