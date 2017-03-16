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
import { FourzerofourComponent } from './fourzerofour/fourzerofour.component';
import { AccountEditComponent } from './account-edit/account-edit.component';
import { RiderPlannedComponent } from './rider-planned/rider-planned.component';
import { DriverScheduleComponent } from './driver-schedule/driver-schedule.component';
import { RiderScheduleComponent } from './rider-schedule/rider-schedule.component';
import { DriverPlannedIndividualComponent } from './driver-planned-individual/driver-planned-individual.component';
import { TempPageComponent } from './temp-page/temp-page.component';

import { AuthGuard } from './_auth/auth.guard';



export const router: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'temp', component: TempPageComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'forgot', component: ForgotComponent },
    { path: 'drivertype', component: DriverTypeComponent, canActivate: [AuthGuard] },
    { path: 'ridertype', component: RiderTypeComponent, canActivate: [AuthGuard] },
    { path: 'usertype', component: UserTypeComponent, canActivate: [AuthGuard] },
    { path: 'driverondemandsubmit', component: DriverOndemandSubmitComponent, canActivate: [AuthGuard] },
    { path: 'riderondemandsubmit', component: RiderOndemandSubmitComponent, canActivate: [AuthGuard] },
    { path: 'driverplannedsubmit', component: DriverPlannedSubmitComponent, canActivate: [AuthGuard] },
    { path: 'riderplannedsubmit', component: RiderPlannedSubmitComponent, canActivate: [AuthGuard] },
    { path: 'account', component: AccountComponent, canActivate: [AuthGuard] },
    { path: 'accountedit', component: AccountEditComponent, canActivate: [AuthGuard] },
    { path: 'riderplanned', component: RiderPlannedComponent, canActivate: [AuthGuard] },
    { path: 'riderschedule', component: RiderScheduleComponent, canActivate: [AuthGuard] },
    { path: 'driverschedule', component: DriverScheduleComponent, canActivate: [AuthGuard] },
    { path: 'driverindividual', component: DriverPlannedIndividualComponent, canActivate: [AuthGuard] },

    { path: '**', component: FourzerofourComponent }

];

export const routes: ModuleWithProviders = RouterModule.forRoot(router);