import { Component, OnInit } from '@angular/core';
import { SearchService } from '../services/search.service';

@Component({
  selector: 'app-mainheader',
  templateUrl: './mainheader.component.html',
  styleUrls: ['./mainheader.component.css']
})
export class MainheaderComponent implements OnInit {
  enterSomething: boolean;
  display: boolean;
  matchresult: any;
  notFound_msg: any;

  constructor(private searchservice:SearchService) { }

  matchLocation(searchLocation){
    if(!searchLocation){
      this.enterSomething=true;
    }
    else{
      this.searchservice.matchLocation(searchLocation)
      .subscribe((result_matchlocation)=>{
        console.log(result_matchlocation)
        if(result_matchlocation.code==200){
          this.matchresult=result_matchlocation.result_locationrestro;
          this.notFound_msg='';
          this.display=true;
        }
        else{
          this.notFound_msg=result_matchlocation.result_locationrestro_message;
        }
      },
      (err)=>{
        console.log(err);
      })
    }
  }
  ngOnInit() {
  }

}
