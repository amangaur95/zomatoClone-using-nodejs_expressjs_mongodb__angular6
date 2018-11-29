import { NgModule } from '@angular/core';
import { RouterModule, Routes ,CanActivate} from '@angular/router';

import { HeaderComponent }      from './header/header.component';
import { MiddlecontentComponent } from './middlecontent/middlecontent.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuardService } from './services/authguard.service';
import { OrderfoodpageComponent } from './orderfoodpage/orderfoodpage.component';
import { OrderfoodonlineComponent } from './orderfoodonline/orderfoodonline.component';
import { CuisinelistComponent } from './cuisinelist/cuisinelist.component';
import { ProductbusinessComponent } from './productbusiness/productbusiness.component';
import { HomepageComponent } from './homepage/homepage.component';
import { AddrestropageComponent } from './addrestropage/addrestropage.component';
import { UploadComponent } from './upload/upload.component';
import { CityrestaurantComponent } from './cityrestaurant/cityrestaurant.component';
import { HomeComponent } from './home/home.component';
import { FoodlistPriceComponent } from './foodlist-price/foodlist-price.component';
import { AddcartComponent } from './addcart/addcart.component';
import { PaymentpageComponent } from './paymentpage/paymentpage.component';
import { RestaurantadminviewmenupageComponent } from './restaurantadminviewmenupage/restaurantadminviewmenupage.component';
import { AdminviewrestaurantpageComponent } from './adminviewrestaurantpage/adminviewrestaurantpage.component';
import { EditmenupageComponent } from './editmenupage/editmenupage.component';
import { EmailverifyComponent } from './emailverify/emailverify.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';

const routes: Routes = [
  { path:'', component:HomeComponent },
  { path:'login',component:LoginComponent },
  { path:'register',component:SignupComponent },
  { path:'profile',component:ProfileComponent, canActivate: [AuthGuardService] },
  { path:'search', component:HeaderComponent },
  { path:'orderfoodpage', component:OrderfoodpageComponent },
  { path:'orderfoodonline', component:OrderfoodonlineComponent },
  { path:'cuisinelist', component:CuisinelistComponent },
  { path:'productbusiness', component:ProductbusinessComponent },
  { path:'home', component:HomepageComponent },
  { path:'addrestaurant', component:AddrestropageComponent, canActivate: [AuthGuardService] },
  { path:'upload/:restaurantname/:id', component:UploadComponent, canActivate: [AuthGuardService] },
  { path:'citylocality/:city', component:CityrestaurantComponent },
  { path:'localityrestaurant/:locality', component:OrderfoodonlineComponent },
  { path:'foodlist/:restaurantname/:id', component:FoodlistPriceComponent, canActivate: [AuthGuardService] },
  { path:'cartitem', component:AddcartComponent },
  { path:'pay', component:PaymentpageComponent },
  { path:'viewmenupage/:restaurantname/:id', component:RestaurantadminviewmenupageComponent, 
  canActivate: [AuthGuardService] },
  { path:'adminrestaurantviewpage', component:AdminviewrestaurantpageComponent, 
  canActivate: [AuthGuardService] },
  { path:'editmenupage/:id', component:EditmenupageComponent,
  canActivate: [AuthGuardService] },
  { path:'emailverify/:id', component:EmailverifyComponent },
  { path:'forgotpassword', component:ForgotpasswordComponent },
  { path:'passwordreset/:id', component:ResetpasswordComponent }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ],
  declarations: []
})
export class AppRoutingModule { }
