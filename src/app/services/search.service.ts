import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  uri = "http://localhost:4000/search";

  constructor(private http:HttpClient) { }

  search_restro(text):Observable<any>{
    return this.http.post(`${this.uri}/searchrestro`,{'val' : text})
  }

  matchLocation(searchLocation) : Observable<any>{
    return this.http.post(`${this.uri}/matchLocation`,{'searchLocation':searchLocation})
  }
  
}