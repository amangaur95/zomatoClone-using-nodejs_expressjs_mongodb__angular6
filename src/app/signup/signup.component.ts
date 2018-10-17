import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { ToasterService } from '../services/toaster.service';
import { LoginsignupService } from '../services/loginsignup.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  angForm: FormGroup;

  constructor(private userservice: UserService,
  private fb: FormBuilder,
  private router:Router,
  private toasterService:ToasterService,
  private loginsignupservice:LoginsignupService) { 
    this.createForm();
  }
  createForm() {
    this.angForm = this.fb.group({
      name: ['', Validators.required ],
      username: ['', Validators.required ],
      email: ['', Validators.required ],
      password: ['', Validators.required ]
   });
  }

  addUser(){
    this.loginsignupservice.addUser(this.angForm.value)
    .subscribe((result)=>{
      console.log(result);
      if(result.code==200){
        this.router.navigateByUrl('/login');
        this.toasterService.successToaster(result.msg.str1, result.msg.str2)
      }
      else{
        this.toasterService.errorToaster(result.msg.msg1,result.msg.msg2)
      }
    })
  }

  // addUser(){
  //   this.userservice.addUser(this.angForm.value)
  //   .subscribe((result)=>{
  //     if(result.code==200){
  //       this.router.navigateByUrl('/login');
  //       this.toasterService.successToaster(result.success.str1, result.success.str2)
  //     }
  //   })
  // }
  ngOnInit() {
  }

}
