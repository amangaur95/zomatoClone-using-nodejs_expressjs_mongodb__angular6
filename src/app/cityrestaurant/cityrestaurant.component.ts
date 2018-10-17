import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cityrestaurant',
  templateUrl: './cityrestaurant.component.html',
  styleUrls: ['./cityrestaurant.component.css']
})
export class CityrestaurantComponent implements OnInit {
  cityrestaurants: any;
  cityname: any;

  constructor(private userservice:UserService,
    private route: ActivatedRoute,
    private router: Router) {
      this.route.params.subscribe(params=>{
        this.cityname = params['city'];
      });
  }


  ngOnInit() {
  }

}
