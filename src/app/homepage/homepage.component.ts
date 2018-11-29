import { Component, OnInit } from '@angular/core';
import { RestaurantdetailsService } from '../services/restaurantdetails.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  cities: any;
  restaurants: any;
  page: Number = 1;
  totalRecords: Number = 0;
  perPageRecords: Number = 0;
  
  constructor(private restaurantdetails:RestaurantdetailsService) { }

  ngOnInit() {
    this.getnewRestaurant(this.page);  
  }

  getnewRestaurant(page){
    this.restaurantdetails.getnewRestaurant(page)
    .subscribe((result_restrodetails)=>{
      this.restaurants=result_restrodetails.restro_details;
      this.totalRecords=result_restrodetails.count;
      this.perPageRecords=result_restrodetails.perPage;
      this.page=result_restrodetails.current_page;
    },
    (err)=>{
      console.log(err);
    })
  }

  paginate(event){
    let newPage = event.page + 1;
    this.getnewRestaurant(newPage);
  }

}