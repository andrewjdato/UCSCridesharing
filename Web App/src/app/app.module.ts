import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule,FormControl } from '@angular/forms';
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
import { AgmCoreModule } from 'angular2-google-maps/core'
import { DirectionsMapDirective } from 'app/map/google-map.directive';

import { AuthGuard } from './_auth/auth.guard';
import { AuthService }  from './_services/auth.service';
import { UserService }  from './_services/user.service';
import { PlannedService }  from './_services/planned.service';
import {driverodServ} from './_services/driverOnDemand.service';
import {riderodServ} from './_services/riderOnDemand.service';

import { fakeBackendProvider } from './_temp/fakebackend';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { BaseRequestOptions } from '@angular/http';
import { AccountEditComponent } from './account-edit/account-edit.component';
import { RiderPlannedComponent } from './rider-planned/rider-planned.component';
import { DriverScheduleComponent } from './driver-schedule/driver-schedule.component';
import { RiderScheduleComponent } from './rider-schedule/rider-schedule.component';
import { DriverPlannedIndividualComponent } from './driver-planned-individual/driver-planned-individual.component';
import { TempPageComponent } from './temp-page/temp-page.component';
import {DirectionsMapDirectiver} from "./map/google-mapRider.directive";
import { PlannedMapsComponent } from './planned-maps/planned-maps.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    ForgotComponent,
    LoginComponent,
    UserTypeComponent,
    DriverTypeComponent,
    DirectionsMapDirective,
      DirectionsMapDirectiver,
    RiderTypeComponent,
    DriverPlannedSubmitComponent,
    RiderPlannedSubmitComponent,
    RiderOndemandSubmitComponent,
    DriverOndemandSubmitComponent,
    AccountComponent,
    FourzerofourComponent,
    AccountEditComponent,
    RiderPlannedComponent,
    DriverScheduleComponent,
    RiderScheduleComponent,
    DriverPlannedIndividualComponent,
    TempPageComponent,
    PlannedMapsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    routes,
      AgmCoreModule.forRoot({apiKey:'AIzaSyDY1oCQ3t61xlUPoqJkeDp1WFTThmB-EEM',libraries:["places"] })
  ],
  providers: [
        AuthGuard,
        AuthService,
        UserService,
        PlannedService,
      driverodServ,
      riderodServ

        // providers used to create fake backend
        //fakeBackendProvider,
        //MockBackend,
        //BaseRequestOptions
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
