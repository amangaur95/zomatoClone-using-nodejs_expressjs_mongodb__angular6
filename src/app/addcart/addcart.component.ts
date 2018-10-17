import { Component, OnInit } from '@angular/core';
import { AddtocartService } from '../services/addtocart.service';

@Component({
  selector: 'app-addcart',
  templateUrl: './addcart.component.html',
  styleUrls: ['./addcart.component.css']
})
export class AddcartComponent implements OnInit {
  cartitems: any;
  total:number = 0;

  constructor(private addcartservice:AddtocartService) { }

  ngOnInit() {
    this.addcartservice.getCart(localStorage.getItem('user_id'))
    .subscribe((result_cartitem)=>{
      console.log(result_cartitem.cartitem);
      this.cartitems=result_cartitem.cartitem;
    },
    (err)=>{
      console.log(err);
    })
  }


  totalPrice(){
    this.total = 0;
    for(var i=0;i<this.cartitems.length;i++){
      this.total += (this.cartitems[i]._id.food_price * this.cartitems[i].quantitycount);
    }
  }

  add(pid){
    console.log(pid);
    for(var i=0;i<this.cartitems.length;i++){
      if(this.cartitems[i]._id.food_id === pid)
      {  
        this.cartitems[i].quantitycount += 1;
        this.addcartservice.addcartItem(this.cartitems[i],this.cartitems[i]._id.food_id)
        .subscribe((result_added)=>{
          console.log(result_added);
        })
      }           
    }
    this.totalPrice();
    console.log(this.cartitems);
  }

  del(pid){
    console.log(pid);
    for(var i=0;i<this.cartitems.length;i++){
      if(this.cartitems[i]._id.food_id === pid)
      {  
        this.cartitems[i].quantitycount -= 1;
        this.addcartservice.deletecartItem(this.cartitems[i]._id.food_id,localStorage.getItem('user_id'))
        .subscribe((result_deleted)=>{
          console.log(result_deleted);
        })
      }           
    }
    

    this.totalPrice();
    console.log(this.cartitems);
  }

}
