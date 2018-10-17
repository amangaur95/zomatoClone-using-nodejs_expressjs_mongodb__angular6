import { Injectable } from '@angular/core';
import { Router } from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class UserService {
 
  constructor() { }
    data:any;

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user_id');
  }

  public get loggedIn(): boolean {
    return (localStorage.getItem('token') !== null);
  }

  isAuth() {
    try {
      if (localStorage.getItem('token')) {
        return true;
      }
      else {
        return false;
      }
    }
    catch (err) {
      return false;
    }
  }

}