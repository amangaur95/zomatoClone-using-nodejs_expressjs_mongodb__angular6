import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  uri = "http://localhost:4000/restaurant";

  constructor(private http:HttpClient) { }

  addrestaurant(restro_details):Observable<any>{
    return this.http.post(`${this.uri}/newrestaurant`,restro_details)
  }

}