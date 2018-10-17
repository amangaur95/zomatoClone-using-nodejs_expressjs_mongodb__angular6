import { Component, OnInit, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { PaymentService } from '../services/payment.service';
//for using stripe in index.html file enter publishable key of stripe and in stripe.route.js enter your secret key
@Component({
  selector: 'app-paymentpage',
  templateUrl: './paymentpage.component.html',
  styleUrls: ['./paymentpage.component.css']
})
export class PaymentpageComponent implements OnInit {
  @Input() payment: any;
  payform: FormGroup;
  token : any;
  
  constructor(private fb:FormBuilder,
    private paymentservice:PaymentService,
    private toaster:ToastrService,
    private http:HttpClient) { 
      this.createForm();
    }
    createForm(){
      
      this.payform=this.fb.group({
        cardNumber:[''],
        expMonth:[''],
        expYear:[''],
        cvc:[''],
        email:['']
      })
    }
   
  
  chargeCreditCard() {
    (<any>window).Stripe.card.createToken({
      number:this.payform.value.cardNumber,
      exp_month:this.payform.value.expMonth,
      exp_year:this.payform.value.expYear,
      cvc:this.payform.value.cvc
    }, (status: number, response: any) => {
      if (status === 200) {
        let token = response.id;
        this.chargeCard(token);
      } else {
        console.log(response.error.message);
      }
    });
  }

  chargeCard(token){
    this.paymentservice.card(token,this.payform.value,this.payment)
    .subscribe((result_status)=>{
      console.log(result_status);
    })
  }
    
  ngOnInit() {

  }

}
