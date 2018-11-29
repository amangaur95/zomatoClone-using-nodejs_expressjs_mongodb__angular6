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
  display: boolean;
  result_searchrestro: any;
  restro: any;

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
    })
  }
 
  search(text){
    this.searchservice.search_restro(text,this.cityname)
    .subscribe((result_searchrestro)=>{
      this.result_searchrestro=result_searchrestro;
      this.restro=this.result_searchrestro.result_restro;
      if(this.result_searchrestro.code==200){
        this.display=true;
      }
    },
    (err)=>{
      console.log(err);
    })
  }

}
