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
// selectedFile = null;

//   constructor(private http: HttpClient) {
//    }
//    onFileSelected(event){
//     //  console.log(event);
//     this.selectedFile = event.target.files[0];
//    }
//    onUpload(){

//    }
  constructor(private fb:FormBuilder,
    private menuservice:MenuService,
    private activatedroute:ActivatedRoute,
    private router:Router,
    private toasterService:ToasterService){
     
      this.activatedroute.params.subscribe(params => {
        this.id = params['id'];
        this.createForm();
        // console.log(this.id); 
    });

     console.log(this.angForm.value);
  }
  
  createForm(){
    this.angForm = this.fb.group({
      food_name: ['', Validators.required ],
      food_price: ['', Validators.required ],
      food_services: ['', Validators.required],
      food_desc: [''],
      restaurant_id:this.id,
      // food_services: ['', Validators.required],
      // items: this.fb.array([
      //   this.createItem(),
      //   ])
    })
  }
  // createItem(){
  //   return this.fb.group({
  //     food_name: ['', Validators.required ],
  //     food_price: ['', Validators.required ],
  //     food_desc: [''],
  //   })
  // }

  // addItem() {
  //   const control = <FormArray>this.angForm.controls['items'];
  //   control.push(this.createItem());
  //   }

  // removeItem(i: number) {
  //   const control = <FormArray>this.angForm.controls['items'];
  //   control.removeAt(i);
  // }
  ngOnInit() {
  }
  

  addmenu(){
    // console.log(this.angForm.value);
    if(localStorage.getItem('user_id') && localStorage.getItem('token')){
    this.menuservice.addmenu(this.angForm.value)
    .subscribe((result_addmenures)=>{
      // console.log(result_addmenures)
      // this.router.navigateByUrl("/viewmenupage");
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
