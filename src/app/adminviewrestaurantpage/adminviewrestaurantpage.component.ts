import { Component, OnInit } from '@angular/core';
import { RestaurantadminService } from '../services/restaurantadmin.service';

@Component({
  selector: 'app-adminviewrestaurantpage',
  templateUrl: './adminviewrestaurantpage.component.html',
  styleUrls: ['./adminviewrestaurantpage.component.css']
})
export class AdminviewrestaurantpageComponent implements OnInit {
  newrestaurantlists: any;

  constructor(private restaurantadmin:RestaurantadminService) { }

  ngOnInit() {
    this.restaurantadmin.getrestroadminRestaurant(localStorage.getItem('user_id'))
    .subscribe((result_restaurantlist)=>{
      this.newrestaurantlists=result_restaurantlist.newrestaurantlist;
    },
    (err)=>{
      console.log(err);
    })
  }

}
