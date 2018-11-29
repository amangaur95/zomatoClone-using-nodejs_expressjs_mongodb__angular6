import { Component, OnInit } from '@angular/core';
import { AddtocartService } from '../services/addtocart.service';
import { PaymentService } from '../services/payment.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addcart',
  templateUrl: './addcart.component.html',
  styleUrls: ['./addcart.component.css']
})
export class AddcartComponent implements OnInit {
  cartitems: any;
  total:number = 0;
  quantitycountZer0: number;
  quantitycountMax: number;

  constructor(private addcartservice:AddtocartService,
    private paymentservice:PaymentService,
    private router:Router) { }

  ngOnInit() {
    this.addcartservice.getCart(localStorage.getItem('user_id'))
    .subscribe((result_cartitem)=>{
      this.cartitems=result_cartitem.cartitem;
      this.totalCartPrice();
    },
    (err)=>{
      console.log(err);
    })
  }

  totalCartPrice(){
    for(let i=0;i<this.cartitems.length;i++){
      this.total += this.cartitems[i].cartprice;
    }
  }

  totalPrice(){
    this.total = 0;
    for(let i=0;i<this.cartitems.length;i++){
      this.total += (this.cartitems[i]._id.food_price * this.cartitems[i].quantitycount);
    }
  }

  
  add(pid){
    for(let i=0;i<this.cartitems.length;i++){
      if(this.cartitems[i]._id.food_id === pid)
      {  
        if(this.cartitems[i].quantitycount==5){
          this.quantitycountMax=1;
        }
        else{
          this.quantitycountZer0=0;
          this.cartitems[i].quantitycount += 1;
          this.addcartservice.addcartItem(this.cartitems[i],this.cartitems[i]._id.food_id)
          .subscribe((result_added)=>{
            console.log("Successfully added");
          })
        }
      }           
    }
    this.totalPrice();
  }

  del(pid){
    for(let i=0;i<this.cartitems.length;i++){
      if(this.cartitems[i]._id.food_id === pid)
      {  
        if(this.cartitems[i].quantitycount==0){
          this.quantitycountZer0=1;
        }
        else{
          this.cartitems[i].quantitycount -= 1;
          this.quantitycountMax=0;
          this.addcartservice.deletecartItem(this.cartitems[i]._id.food_id,localStorage.getItem('user_id'))
          .subscribe((result_deleted)=>{
            console.log("Successfully deleted");
          })
        }
      }           
    }
    this.totalPrice();
  }

  proceedPay(total){
    // this.paymentservice.cartItemTotal.emit(total);
    this.paymentservice.cartTotalPrice.next(total);
    this.router.navigateByUrl('/pay');
  }

}