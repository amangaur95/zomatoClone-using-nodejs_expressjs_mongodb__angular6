import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loginlogoutnav',
  templateUrl: './loginlogoutnav.component.html',
  styleUrls: ['./loginlogoutnav.component.css']
})
export class LoginlogoutnavComponent implements OnInit {

  constructor(private userservice:UserService,
    private router:Router) { 

    }

  logout(){
    this.userservice.logout();
    this.router.navigate(['login'])
  }
  
  ngOnInit() {
  }

}
