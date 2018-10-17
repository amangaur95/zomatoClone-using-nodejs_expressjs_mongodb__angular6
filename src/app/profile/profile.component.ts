import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private userservice : UserService,
  private router: Router) { }
  
  logout(){
    this.userservice.logout();
    this.router.navigate(['login'])
  }
  ngOnInit() {
 
  }

}
