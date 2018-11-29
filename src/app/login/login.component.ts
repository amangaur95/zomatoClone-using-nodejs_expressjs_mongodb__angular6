import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { LoginsignupService } from '../services/loginsignup.service';
 
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  id:number;
  email:any;
  returnUrl: string;

public error:string;
  angForm: FormGroup;

  constructor(private userservice: UserService,
    private fb: FormBuilder,
    private router:Router,
    private toastr: ToastrService,
    private activateRoute:ActivatedRoute,
    private loginsignupservice:LoginsignupService,
    ) { 
    this.createForm();
  }
  
  createForm() {
    this.angForm = this.fb.group({
      email: ['', Validators.required ],
      password: ['', Validators.required ]
   });
  }

  public submit(){
    if(this.angForm.valid){
      this.loginsignupservice.login(this.angForm.value)
      .pipe(first())
      .subscribe((result_loginstatus)=>{
        if(result_loginstatus==true){
          this.router.navigateByUrl(this.returnUrl);
        }
      },
      (err)=>{
        console.log(err);
      })
    }
    else{
      Object.keys(this.angForm.controls).forEach((formControl: any) => {
        this.angForm.controls[formControl].markAsDirty()
      })
    }
  }

showSuccess() {
  this.toastr.success('You Successfully LoggedIn', 'Toastr fun!');
}

  ngOnInit() {
    this.userservice.logout();
    this.returnUrl = this.activateRoute.snapshot.queryParams['returnUrl'] || '/';
  }

}
