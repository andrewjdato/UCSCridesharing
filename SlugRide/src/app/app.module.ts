import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { routes } from './app.router';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { ForgotComponent } from './forgot/forgot.component';
import { LoginComponent } from './login/login.component';
import { UserTypeComponent } from './user-type/user-type.component';
import { DriverTypeComponent } from './driver-type/driver-type.component';
import { RiderTypeComponent } from './rider-type/rider-type.component';
import { DriverPlannedSubmitComponent } from './driver-planned-submit/driver-planned-submit.component';
import { RiderPlannedSubmitComponent } from './rider-planned-submit/rider-planned-submit.component';
import { RiderOndemandSubmitComponent } from './rider-ondemand-submit/rider-ondemand-submit.component';
import { DriverOndemandSubmitComponent } from './driver-ondemand-submit/driver-ondemand-submit.component';
import { AccountComponent } from './account/account.component';
import { FourzerofourComponent } from './fourzerofour/fourzerofour.component';
import {AgmCoreModule} from 'angular2-google-maps/core'

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    ForgotComponent,
    LoginComponent,
    UserTypeComponent,
    DriverTypeComponent,
    RiderTypeComponent,
    DriverPlannedSubmitComponent,
    RiderPlannedSubmitComponent,
    RiderOndemandSubmitComponent,
    DriverOndemandSubmitComponent,
    AccountComponent,
    FourzerofourComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routes,
      AgmCoreModule.forRoot({apiKey:'AIzaSyDY1oCQ3t61xlUPoqJkeDp1WFTThmB-EEM'})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
