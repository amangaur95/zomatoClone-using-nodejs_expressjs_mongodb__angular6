import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RestaurantadminService } from '../services/restaurantadmin.service';
import { MenuService } from '../services/menu.service';

@Component({
  selector: 'app-restaurantadminviewmenupage',
  templateUrl: './restaurantadminviewmenupage.component.html',
  styleUrls: ['./restaurantadminviewmenupage.component.css']
})
export class RestaurantadminviewmenupageComponent implements OnInit {
  restro_id: any;
  adminmenulists: any;
  restro_name: any;

  constructor(private restaurantadmin:RestaurantadminService,
    private menuservice:MenuService,
    private router:Router,
    private activatedroute:ActivatedRoute) { 
      this.activatedroute.params.subscribe((params)=>{
        this.restro_id=params['id'];
        this.restro_name=params['restaurantname'];
      })
    }

  deleteItem(menu_id,id){
    console.log(menu_id,"from ts",id);
    this.menuservice.deleteMenuItem(menu_id,id)
    .subscribe((deleted_status)=>{
      console.log(deleted_status);
      // location.reload();
      // this.adminmenulists.splice(id,1)
    },
    (err)=>{
      console.log(err);
    })
  }

  ngOnInit() {
    this.restaurantadmin.getrestroAdminMenu(this.restro_id)
    .subscribe((result_adminmenulist)=>{
      this.adminmenulists=result_adminmenulist.admin_menulist;
    },
    (err)=>{
      console.log(err);
    })
  }
}
