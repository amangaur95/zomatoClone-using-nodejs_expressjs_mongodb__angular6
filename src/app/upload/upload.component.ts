import { Component, OnInit ,EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToasterService } from '../services/toaster.service'
import { MenuService } from '../services/menu.service';
// import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  angForm: FormGroup;
  id: any;
  menuCount:number = 1;
  itemUploadCount:number = 0;
  restaurantname: any;

  constructor(private fb:FormBuilder,
    private menuservice:MenuService,
    private activatedroute:ActivatedRoute,
    private router:Router,
    private toasterService:ToasterService){
      this.activatedroute.params.subscribe(params => {
        this.id = params['id'];
        this.restaurantname = params['restaurantname'];
        this.createForm();
    });
  }

  ngOnInit() {
    const control = <FormArray>this.angForm.controls['more_item'];
    control.push(this.createItem());
  }

  createForm(){
    this.angForm = this.fb.group({
      // food_name: ['', Validators.required ],
      // food_price: ['', Validators.required ],
      // food_services: ['', Validators.required],
      // food_desc: [''],
      restaurant_id:this.id,
      more_item: this.fb.array([])
    })
  }

  createItem(){
    return this.fb.group({
      morefood_name: ['', Validators.required ],
      morefood_price: ['', Validators.required ],
      morefood_services: ['', Validators.required],
      morefood_desc: [''],
    });
  }
  
  deleteItem(index: number){
    if(this.itemUploadCount>0){
      const control = <FormArray>this.angForm.controls['more_item'];
      control.removeAt(index);   // remove the chosen row
      this.itemUploadCount -= 1;
    }
  }

  addMoreItem(){
    const control = <FormArray>this.angForm.controls['more_item'];
    control.push(this.createItem());
    this.itemUploadCount += 1;
  }
 
  addmenu(){
    if(localStorage.getItem('user_id') && localStorage.getItem('token')){
      this.menuservice.addmenu(this.angForm.value)
      .subscribe((result_addmenures)=>{
      this.router.navigateByUrl("/viewmenupage/"+this.restaurantname+'/'+this.id);
      this.toasterService.successToaster(result_addmenures.success.str1, result_addmenures.success.str2)
    },
    (err)=>{
      console.log(err);
    })
    }
  }

  addSellingPoint(){
    this.menuCount++;
  }

}
