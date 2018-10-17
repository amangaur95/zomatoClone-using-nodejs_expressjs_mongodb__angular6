import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestaurantdetailsService {

  uri = "http://localhost:4000/restaurantdetail"

  constructor(private http : HttpClient) { }
  
  getTag(): Observable<any>{
    return this.http.get(`${this.uri}/tag`);
  }
  
  getCuisine():Observable<any>{
    return this.http.get(`${this.uri}/cuisinelist`);
  }

  getTiming() : Observable<any>{
    return this.http.get(`${this.uri}/timing`);
  }

  getnewCity(page): Observable<any>{
    return this.http.get(`${this.uri}/newcity/${page}`)
  }

  getCityLocality(cityname) :Observable<any>{
    return this.http.post(`${this.uri}/citylocality`,{'city':cityname});
  }

  getLocalRestaurant(locality) : Observable<any>{
    return this.http.post(`${this.uri}/getlocalrestro`,{'locality':locality});
  }
 
  getnewRestaurant(page): Observable<any>{
    return this.http.get(`${this.uri}/newrestaurant/${page}`)
  }

}