import { Component, OnInit } from '@angular/core';
import { RestaurantdetailsService } from '../services/restaurantdetails.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  cities: any;
  page: Number = 1;
  totalRecords: Number = 0;
  perPageRecords: Number = 0;

  constructor(private restaurantdetail:RestaurantdetailsService) { }

  // ngOnInit() {
  //   this.restaurantdetail.getnewCity()
  //   .subscribe((result_city)=>{
  //     this.cities=result_city.newcity;
  //   })
  // }
  ngOnInit() {
    this.getnewCity(this.page);
  }

  getnewCity(page){
    this.restaurantdetail.getnewCity(page)
    .subscribe((result_city)=>{
      this.cities=result_city.newcity;
      this.totalRecords=result_city.count;
      this.perPageRecords=result_city.perPage;
      this.page=result_city.current_page;
    })    
  }

  paginate(event){
    let newPage = event.page + 1;
    this.getnewCity(newPage);
  }
}
