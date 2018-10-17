import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RestaurantadminService {

  uri = "http://localhost:4000/restaurantadmin";

  constructor(private http:HttpClient) { }

  getrestroadminRestaurant(id): Observable<any>{
    return this.http.get(`${this.uri}/getadminrestro/${id}`)
  }

  getrestroAdminMenu(id): Observable<any>{
    return this.http.get(`${this.uri}/getrestroadminmenu/${id}`)
  }
  
}