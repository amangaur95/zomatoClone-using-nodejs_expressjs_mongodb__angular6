import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  uri = "http://localhost:4000/search";

  constructor(private http:HttpClient) { }

  search_restro(text,cityname):Observable<any>{
    const obj = {
      text:text,
      cityname:cityname
    }
    return this.http.post(`${this.uri}/searchrestro`, obj)
  }

  matchLocation(searchLocation) : Observable<any>{
    return this.http.post(`${this.uri}/matchLocation`,{'searchLocation':searchLocation})
  }
  
}