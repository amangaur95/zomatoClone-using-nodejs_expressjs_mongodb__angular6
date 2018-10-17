import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestaurantdetailsService } from '../services/restaurantdetails.service';
import { SearchService } from '../services/search.service';

@Component({
  selector: 'app-middlecontent',
  templateUrl: './middlecontent.component.html',
  styleUrls: ['./middlecontent.component.css']
})

export class MiddlecontentComponent implements OnInit {
  error: string;
  cityrestaurants: any;
  cityname: any;
  citylocalities: any;

  constructor(private searchservice:SearchService,
    private restaurantdetail : RestaurantdetailsService,
    private route: ActivatedRoute,
    private router: Router) {
    this.route.params.subscribe(params=>{
      this.cityname = params['city'];
    });
   }

  ngOnInit() {
    this.restaurantdetail.getCityLocality(this.cityname)
    .subscribe((result_citylocality)=>{
      this.citylocalities=result_citylocality.citylocality;
      console.log(this.citylocalities)
    })

  }
 
  search(text){
    this.searchservice.search_restro(text)
    .subscribe((result_searchrestro)=>{
      console.log(result_searchrestro);
    },
    (err)=>{
      console.log(err);
    })
  }

}
