import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators  } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { ToasterService } from '../services/toaster.service';
import { RestaurantService } from '../services/restaurant.service';
import { RestaurantdetailsService } from '../services/restaurantdetails.service';


@Component({
  selector: 'app-addrestropage',
  templateUrl: './addrestropage.component.html',
  styleUrls: ['./addrestropage.component.css']
})
export class AddrestropageComponent implements OnInit {
  uploadedFiles: any[] = [];

  angForm: FormGroup;
  owner_ornot: string = "I m not the owner or a manager";
  status_val: string="This place is already open";
  serve_value: string="Serves Alcohol";
  service_value: string[];
  seating_value:string="Seating Available";
  payment:string="Cards and Cash";
  selectedCategories: string[];
  cuisines: any;
  tag: any;
  weekDay: string[];
  timings: any;
  restaurants: any;
  restaurant_images: File;
  id:any;
  restaurant_name: Promise<boolean>;

  constructor(private fb: FormBuilder,
    private userservice:UserService,
    private restaurantdetails:RestaurantdetailsService,
    private restaurantservice:RestaurantService,
    private toasterService:ToasterService,
    private router:Router,
    private cd: ChangeDetectorRef) { 
      this.createForm();
    } 
    createForm() {
      this.angForm = this.fb.group({
        restaurant_name: ['', Validators.required ],
        city: ['', Validators.required ],
        restaurant_locality:['',Validators.required],
        phone_number:[''],
        owner_ornot:[''],
        owner_phone:[''],
        owner_email:[''],
        status_val:[''],
        address:[''],
        serve_value:[''],
        service_value:[''],
        seating_value:[''],
        selectedCategories:[''],
        payment:[''],
        weekDay:[''],
        restaurant_email:[''],
        restaurant_website:[''],
        cuisines:[''],
        tags:[''],
        startTime:[''],
        endTime:[''],
        file:[''],
        user_id:localStorage.getItem('user_id'),
     });
     
    }

    onFileChange(event) {
      const reader = new FileReader();
   
      if(event.target.files && event.target.files.length) {
        const [file] = event.target.files;
        reader.readAsDataURL(file);
    
        reader.onload = () => {
          this.angForm.patchValue({
            file: reader.result
         });
        
          // need to run CD since file load runs outside of zone
          this.cd.markForCheck();
        };
      }
    }
  
    addrestaurant(){
      // console.log(this.angForm.value.city,"qwerrttyyy")
      if(localStorage.getItem('user_id') && localStorage.getItem('token')){
      this.restaurantservice.addrestaurant(this.angForm.value)
      .subscribe((result_restro)=>{
        this.id=result_restro.id;
        this.restaurant_name=result_restro.restaurant_name;
        this.router.navigateByUrl('/upload/'+this.restaurant_name+'/'+this.id);
        this.toasterService.successToaster(result_restro.success.str1, result_restro.success.str2)
      })
    }
    }

  ngOnInit() {

    this.restaurantdetails.getTag()
    .subscribe((result_tag)=>{
      this.tag=result_tag.tags;
    },(err)=>{
      console.log(err);
    });

    this.restaurantdetails.getCuisine()
    .subscribe((result_cuisine)=>{
      this.cuisines=result_cuisine.data;
    },(err)=>{
      console.log(err);
    });

   this.restaurantdetails.getTiming()
   .subscribe((result_time)=>{
     this.timings=result_time.timing;
   },(err)=>{
     console.log(err);
   })
   
  }

}
