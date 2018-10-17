import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ToasterService } from './toaster.service';

@Injectable({
  providedIn: 'root'
})
export class LoginsignupService {

  uri = "http://localhost:4000/api";

  constructor(private http:HttpClient,
    private toasterservice:ToasterService) { }

    addUser(user_details): Observable<any> {
      return this.http.post(`${this.uri}/signup`, user_details); 
    }
  
    login(user_info): Observable<boolean> {
      return this.http.post<{token,user,msg,code}>(`${this.uri}/signin`, user_info)
        .pipe(
          map(result => {
            if(result.code==200){
              localStorage.setItem('token', result.token);
              // console.log(result,"from service login");  
              localStorage.setItem('user_id',result.user._id);
              this.toasterservice.successToaster(result.msg.str1, result.msg.str2);
              return true;
            }
            else{
              this.toasterservice.errorToaster(result.msg.str1, result.msg.str2);
              return false;
            }
          })
        );
    }
}