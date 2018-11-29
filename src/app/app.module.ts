import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MiddlecontentComponent } from './middlecontent/middlecontent.component';
import { FooterComponent } from './footer/footer.component';
import { AppRoutingModule } from './/app-routing.module';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from './user.service';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuardService } from './services/authguard.service';
import { JwtModule } from '@auth0/angular-jwt';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthtokeninterceptorService } from './services/authtokeninterceptor.service';
import { ToastrModule } from 'ngx-toastr';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { OrderfoodpageComponent } from './orderfoodpage/orderfoodpage.component';
import { OrderfoodonlineComponent } from './orderfoodonline/orderfoodonline.component';
import { CuisinelistComponent } from './cuisinelist/cuisinelist.component';
import { DialogModule } from 'primeng/dialog';
import { RadioButtonModule } from 'primeng/radiobutton';
import { AccordionModule } from 'primeng/accordion';
import { InputMaskModule } from 'primeng/inputmask';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { CardModule } from 'primeng/card';
import { FileUploadModule } from 'primeng/fileupload';
import { PaginatorModule } from 'primeng/paginator';
import { ProductbusinessComponent } from './productbusiness/productbusiness.component';
import { HomepageComponent } from './homepage/homepage.component';
import { AddrestropageComponent } from './addrestropage/addrestropage.component';
import { UploadComponent } from './upload/upload.component';
import { NgxUploaderModule } from 'ngx-uploader';
import { CityrestaurantComponent } from './cityrestaurant/cityrestaurant.component';
import { HomeComponent } from './home/home.component';
import { MainheaderComponent } from './mainheader/mainheader.component';
import { AddcartComponent } from './addcart/addcart.component';
import { FoodlistPriceComponent } from './foodlist-price/foodlist-price.component';
import { LoginlogoutnavComponent } from './loginlogoutnav/loginlogoutnav.component';
import { PaymentpageComponent } from './paymentpage/paymentpage.component';
import { RestaurantadminviewmenupageComponent } from './restaurantadminviewmenupage/restaurantadminviewmenupage.component';
import { AdminviewrestaurantpageComponent } from './adminviewrestaurantpage/adminviewrestaurantpage.component';
import { EditmenupageComponent } from './editmenupage/editmenupage.component';
import { ToasterService } from './services/toaster.service';
import { AddtocartService } from './services/addtocart.service';
import { LoginsignupService } from './services/loginsignup.service';
import { MenuService } from './services/menu.service';
import { PaymentService } from './services/payment.service';
import { RestaurantService } from './services/restaurant.service';
import { RestaurantadminService } from './services/restaurantadmin.service';
import { RestaurantdetailsService } from './services/restaurantdetails.service';
import { SearchService } from './services/search.service';
import { EmailverifyComponent } from './emailverify/emailverify.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { KeyFilterModule } from 'primeng/keyfilter';

export function tokenGetter(){
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MiddlecontentComponent,
    FooterComponent,
    LoginComponent,
    SignupComponent,
    ProfileComponent,
    OrderfoodpageComponent,
    OrderfoodonlineComponent,
    CuisinelistComponent,
    ProductbusinessComponent,
    HomepageComponent,
    AddrestropageComponent,
    UploadComponent,
    CityrestaurantComponent,
    HomeComponent,
    MainheaderComponent,
    AddcartComponent,
    FoodlistPriceComponent, 
    LoginlogoutnavComponent,
    PaymentpageComponent,
    RestaurantadminviewmenupageComponent,
    AdminviewrestaurantpageComponent,
    EditmenupageComponent,
    EmailverifyComponent,
    ForgotpasswordComponent,
    ResetpasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule ,
    BrowserAnimationsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        // whitelistedDomains: ['localhost:4000'],
        // blacklistedRoutes: ['localhost:4000/api/auth']
      }
    }),
    ToastrModule.forRoot(),
    NgbModule,
    NgbModalModule,
    DialogModule,
    RadioButtonModule,
    AccordionModule,
    InputMaskModule,
    CheckboxModule,
    DropdownModule,
    CardModule,
    FileUploadModule,
    PaginatorModule,
    NgxUploaderModule,
    KeyFilterModule
  ],
  providers: [ UserService, 
    ToasterService, 
    AddtocartService,
    AuthtokeninterceptorService,
    LoginsignupService,
    MenuService,
    PaymentService,
    RestaurantService,
    RestaurantadminService,
    RestaurantdetailsService,
    SearchService,
    AuthGuardService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthtokeninterceptorService,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
