import { Component, OnInit, ViewChild } from '@angular/core';
// import swal from 'sweetalert';
import { CuisinelistComponent } from '../cuisinelist/cuisinelist.component';
import { ActivatedRoute, Router } from '@angular/router';
import { RestaurantdetailsService } from '../services/restaurantdetails.service';

@Component({
  selector: 'app-orderfoodonline',
  templateUrl: './orderfoodonline.component.html',
  styleUrls: ['./orderfoodonline.component.css']
})
export class OrderfoodonlineComponent implements OnInit {

  @ViewChild('CuisinelistComponent')
  private CuisinelistComponent: CuisinelistComponent;
  cuisine: Object;
  cuisineviewDialoge: boolean;
  restaurants: Object;
  error: string;
  newrestaurants: any;
  cities: any;
  locality: any;
  locality_restaurants: any;

  constructor(private restaurantdetail:RestaurantdetailsService,
    private activatedroute:ActivatedRoute,
    private route:Router){
      this.activatedroute.params.subscribe(params=>{
        this.locality = params['locality'];
      });
    }
    
  // }
  // popup(){
  //   swal("Hello world!");
  // }
  getCuisine() {
    this.restaurantdetail.getCuisine()
      .subscribe((data) => {
        this.cuisine = data;
        this.CuisinelistComponent.getCuisinelist(this.cuisine);
        this.cuisineviewDialoge = true;
      },
      (err)=>{
        this.error='Could not find list'
      })
  }

  ngOnInit() {
    this.restaurantdetail.getLocalRestaurant(this.locality)
    .subscribe((result_localrestro)=>{
      console.log(result_localrestro,"restro_local");
      this.locality_restaurants=result_localrestro.localityrestro;
    })

  }

}
