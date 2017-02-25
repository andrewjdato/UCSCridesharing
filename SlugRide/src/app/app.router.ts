import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { ForgotComponent } from './forgot/forgot.component';
import { LoginComponent } from './login/login.component';
import { DriverTypeComponent } from './driver-type/driver-type.component';
import { RiderTypeComponent } from './rider-type/rider-type.component';
import { UserTypeComponent } from './user-type/user-type.component';
import { DriverOndemandSubmitComponent } from './driver-ondemand-submit/driver-ondemand-submit.component';
import { RiderOndemandSubmitComponent } from './rider-ondemand-submit/rider-ondemand-submit.component';
import { DriverPlannedSubmitComponent } from './driver-planned-submit/driver-planned-submit.component';
import { RiderPlannedSubmitComponent } from './rider-planned-submit/rider-planned-submit.component';
import { AccountComponent } from './account/account.component';



export const router: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'forgot', component: ForgotComponent },
    { path: 'drivertype', component: DriverTypeComponent },
    { path: 'ridertype', component: RiderTypeComponent },
    { path: 'usertype', component: UserTypeComponent },
    { path: 'driverondemandsubmit', component: DriverOndemandSubmitComponent },
    { path: 'riderondemandsubmit', component: RiderOndemandSubmitComponent },
    { path: 'driverplannedsubmit', component: DriverPlannedSubmitComponent },
    { path: 'riderplannedsubmit', component: RiderPlannedSubmitComponent },
    { path: 'account', component: AccountComponent }

];

export const routes: ModuleWithProviders = RouterModule.forRoot(router);