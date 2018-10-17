import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AddtocartService } from '../services/addtocart.service';
import { MenuService } from '../services/menu.service';

@Component({
  selector: 'app-foodlist-price',
  templateUrl: './foodlist-price.component.html',
  styleUrls: ['./foodlist-price.component.css']
})
export class FoodlistPriceComponent implements OnInit {
  menulists: any=[];
  id: any;
  food_services: any;
  arrayData:any=[];
  itemcount: number = 0;

  constructor(private menuservice:MenuService,
    private addcartservice:AddtocartService,
    private activatedroute:ActivatedRoute) {
      this.activatedroute.params.subscribe(params=>{
        this.id=params['id'];
      })
     }

  ngOnInit() {
    this.menuservice.getMenu(this.id)
    .subscribe((result_menulist)=>{
      this.menulists=result_menulist.menu_list;
      console.log(result_menulist);
    },
    (err)=>{
      console.log(err);
    })

    this.addcartservice.getCart(localStorage.getItem('user_id'))
    .subscribe((result_menulist)=>{
      console.log(result_menulist);
      // this.itemcount=result_menulist.cartitem.length;
    //  const items = result_menulist.menu_list[0].items
     
    //  items.map(item => item._id)
    //  .filter((value, index, self) => self.indexOf(value) === index)
   

    //  console.log(items)


    //  items.map(x =>{
    //   this.itemcout++;
    //  })
    // },
    // (err)=>{
    //   console.log(err);
    })
  }

  addCart(items) {
    items.restID = this.id
    items.userId = localStorage.getItem('user_id');
    if(localStorage.getItem('user_id')){
      this.addcartservice.addCart(items)
      .subscribe((result)=>{ 
        if(result.code === 200){
          console.log('success')
          this.itemcount++;
        }
      },
      (err)=>{
        console.log(err);
      })
    }
  }

}
