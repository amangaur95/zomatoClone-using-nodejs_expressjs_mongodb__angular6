import { Component, OnInit } from '@angular/core';
import { SearchService } from '../services/search.service';

@Component({
  selector: 'app-mainheader',
  templateUrl: './mainheader.component.html',
  styleUrls: ['./mainheader.component.css']
})
export class MainheaderComponent implements OnInit {

  constructor(private searchservice:SearchService) { }

  matchLocation(searchLocation){
    this.searchservice.matchLocation(searchLocation)
    .subscribe((result_matchlocation)=>{
      console.log(result_matchlocation)
    })
  }
  ngOnInit() {
  }

}
