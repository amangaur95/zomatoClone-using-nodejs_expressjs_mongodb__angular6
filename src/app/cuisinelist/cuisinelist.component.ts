import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-cuisinelist',
  templateUrl: './cuisinelist.component.html',
  styleUrls: ['./cuisinelist.component.css']
})
export class CuisinelistComponent implements OnInit {
  cuisines: any;

  constructor(private userservice: UserService) { }

  ngOnInit() {
  }
  getCuisinelist(data){
    console.log("data------------------",data);
    this.cuisines=data.data;
  }

}
