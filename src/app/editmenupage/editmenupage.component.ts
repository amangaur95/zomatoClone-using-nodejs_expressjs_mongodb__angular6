import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MenuService } from '../services/menu.service';

@Component({
  selector: 'app-editmenupage',
  templateUrl: './editmenupage.component.html',
  styleUrls: ['./editmenupage.component.css']
})
export class EditmenupageComponent implements OnInit {
  id: any;
  fooditem: any;
  angForm : FormGroup
  editfooditem: any;
  result_fooditem: any;
  food_name: any;
  food_price: any;
  food_desc: any;

  constructor(private activatedroute: ActivatedRoute,
    private router: Router,
    private menuservice:MenuService,
    private fb: FormBuilder) {
      this.activatedroute.params
      .subscribe(params=>{
        this.id=params['id'];
        this.menuservice.editFoodItem(this.id)
        .subscribe((result_fooditem)=>{
          this.result_fooditem = result_fooditem;
          this.editfooditem = this.result_fooditem.editfooditem;
          this.fooditem = this.editfooditem.items;
          this.fooditem.forEach(element => {
            this.food_name = element.food_name;
            this.food_price = element.food_price;
            this.food_desc = element.food_desc;
           })
          this.createForm();
          // this.fooditem=result_fooditem.editfooditem[0].items[0];
          // result_fooditem.editfooditem.forEach(element => {
            // this.editfooditem=element;
            // element.items.forEach(item => {
            //   this.fooditem=item;
            //   this.createForm();
            // })
          // });
        }) 
      })
      
     }

  createForm(){
    this.angForm = this.fb.group({
      food_services: [this.editfooditem.food_services, Validators.required],
      food_name: [this.food_name, Validators.required ],
      food_price: [this.food_price, Validators.required ],
      food_desc: this.food_desc,
      item_id:this.id,
      menu_id:this.editfooditem._id
    })
  }

  updatemenu(){
    this.menuservice.upadatemenuitem(this.angForm.value)
    .subscribe((itmeupdate_status)=>{
      console.log(itmeupdate_status);
    },
    (err)=>{
      console.log(err);
    })
  }
  ngOnInit() {
    this.angForm = this.fb.group({
      food_services: ['', Validators.required],
      food_name: ['', Validators.required ],
      food_price: ['', Validators.required ],
      food_desc: '',
      // item_id:this.id,
    })
  }
}
