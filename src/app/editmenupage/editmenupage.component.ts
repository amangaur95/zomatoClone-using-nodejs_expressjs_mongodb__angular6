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

  constructor(private activatedroute: ActivatedRoute,
    private router: Router,
    private menuservice:MenuService,
    private fb: FormBuilder) {
      this.activatedroute.params
      .subscribe(params=>{
        this.id=params['id'];
        this.createForm();
      })
     }

  createForm(){
    this.angForm = this.fb.group({
      food_name: ['', Validators.required ],
      food_price: ['', Validators.required ],
      // food_services: ['', Validators.required],
      food_desc: [''],
      item_id:this.id,
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
    this.menuservice.editFoodItem(this.id)
    .subscribe((result_fooditem)=>{
      this.fooditem=result_fooditem.editfooditem[0].items[0];
      console.log(this.fooditem)
    })
  }

}
