import { Component, OnInit, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { PaymentService } from '../services/payment.service';
import { AddtocartService } from '../services/addtocart.service';
// import { Headers } from '@angular/http'
// import { Card } from 'primeng/card';

@Component({
  selector: 'app-paymentpage',
  templateUrl: './paymentpage.component.html',
  styleUrls: ['./paymentpage.component.css']
})
export class PaymentpageComponent implements OnInit {
  // @Input() payment: any;
  payform: FormGroup;
  token: any;
  cartTotalPrice: any;
  price: any;
  card_info: Object;
  month: any;
  year: any;
  last4: any;
  fingerprint: any;
  card: any;
  email: any;
  token_idcard: any;
  // token1: any;

  constructor(private fb: FormBuilder,
    private paymentservice: PaymentService,
    private toaster: ToastrService,
    private http: HttpClient,
    private addtocartservice: AddtocartService) {
    // this.createForm();
  }

  ngOnInit() {
    this.paymentservice.cartTotalPrice.subscribe( value => {
      this.price = value;
    });

    this.paymentservice.getCardInfo(localStorage.getItem('user_id'))
    .subscribe((card_info)=>{
      console.log(card_info)
      this.card_info=card_info;
      this.card=card_info.card.id;
      this.month=card_info.card.exp_month;
      this.year=card_info.card.exp_year;
      this.last4=card_info.card.last4;
      this.fingerprint=card_info.card.fingerprint;
      this.email=card_info.card.name;
      this.token_idcard=card_info.token
      console.log(this.month,this.year,this.last4,this.fingerprint,this.email,this.card,this.token_idcard);
    },
    (err)=>{
      console.log(err);
    })
  }
  
  // createForm() {
  //   this.payform = this.fb.group({
  //     cardNumber: ['', Validators.compose([Validators.required, Validators.minLength(16), Validators.maxLength(16)])],
  //     expMonth: ['', Validators.compose([Validators.required, Validators.minLength(2)])],
  //     expYear: ['', Validators.compose([Validators.required, Validators.minLength(2)])],
  //     cvc: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
  //     email: ['', Validators.compose([Validators.required])],
  //   })
  // }

  // card(){
  //   this.userservice.card(this.angForm.value)
  //   .subscribe((result)=>{
  //     console.log(result);
  //   });
  // }
  //   chargeCard(token:any):void{
  //     console.log('llklklk')
  //     this.userservice.card(token)
  //     .subscribe((status)=>{
  //       console.log(status);
  //     })
  //   }
  openCheckout() {
    var tok=this;
    var handler = (<any>window).StripeCheckout.configure({

      key: 'pk_test_nulgy2BmiqgQp1OBSePOzc4G',
      locale: 'auto',
      email: tok.email,
      // token: tok.fingerprint
      // last4: tok.last4,
      // exp_month: tok.month,
      // exp_year: tok.year,
      // token: function (token: any) {
        // tok.token1(token);
                                                                          
        // this.chargeCard(token)
        // You can access the token ID with `token.id`.
        // Get the token ID to your server-side code for use.
      // }

    });

    handler.open({
      name: 'Food Style',
      description: 'Payment',
      amount: this.price * 100,
    });

  }

  token1(token){
    console.log(token);
    this.paymentservice.defaultcard(token)
    .subscribe((result)=>{
      console.log(result);
    },
    (err)=>{
      console.log(err);
    })
  }
  
  // chargeCreditCard() {
  //   // let form = document.getElementsByTagName("form")[0];
  //   (<any>window).Stripe.card.createToken({
  //     number: this.payform.value.cardNumber,
  //     exp_month: this.payform.value.expMonth,
  //     exp_year: this.payform.value.expYear,
  //     cvc: this.payform.value.cvc
  //     // number:this.payform.get('cardNumber').value,
  //     // exp_month:this.payform.get('expMonth').value,
  //     // exp_year:this.payform.get('expYear').value,
  //     // cvc:this.payform.get('cvc').value

  //     // number: form.cardNumber.value,
  //     // exp_month: form.expMonth.value,
  //     // exp_year: form.expYear.value,
  //     // cvc: form.cvc.value
  //   }, (status: number, response: any) => {
  //     if (status === 200) {
  //       let token = response.id;
  //       this.chargeCard(token);
  //     } else {
  //       console.log(response.error.message);
  //     }
  //   });
  // }

  // chargeCard(token) {
  //   // this.paymentservice.card(token,this.payform.value,this.payment)
  //   this.paymentservice.card(token, this.payform.value, this.price)
  //   .subscribe((result_status)=>{
  //     console.log(result_status);
  //   })
  // }

  // chargeCard(token: string) {
  //  const headers = new HttpHeaders();
  //  headers.set('token',token),
  //  headers.set('amount','100');
  //   // const headers = new Headers({'token': token, 'amount': 100});
  //   this.http.post('http://localhost:4000/user/charge',{},{headers:headers})
  //     .subscribe(resp => {
  //       console.log(resp);
  //     })
  // }
  // chargeCreditCard(){
  //   this.userservice.card(this.payform.value)
  //   .subscribe((result_status)=>{
  //     console.log(result_status);
  //   })    
  // }
}