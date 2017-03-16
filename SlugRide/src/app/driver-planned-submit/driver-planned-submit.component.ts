import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Driver } from '../_driver/driver';

import { UserService } from '../_services/user.service';
import { PlannedService } from '../_services/planned.service';
import { User } from '../_user/user';

@Component({
  selector: 'app-driver-planned-submit',
  templateUrl: './driver-planned-submit.component.html',
  styleUrls: ['./driver-planned-submit.component.css']
})
export class DriverPlannedSubmitComponent implements OnInit{
      //model : any = {};
      currentUser: User;
      model : Driver; 
      incorrect_submit: boolean; 
      days = { monday : false,
              tuesday : false,
              wednesday : false,
              thursday : false, 
              friday : false, 
              saturday : false, 
              sunday : false};

 
    constructor(
        private router: Router,
        private plannedService : PlannedService,
        private userService: UserService) {
           this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        }
 
    ngOnInit() {
        this.incorrect_submit = false;
        this.model = {
          driver_email: this.currentUser.email, 
          driver_departure: null, 
          driver_destination: null, 
          driver_timeofdeparture: null, 
          driver_days: null,  
        }
    }    

    daysChecker() {
        if (this.days.monday == true) return true; 
        if (this.days.tuesday == true) return true; 
        if (this.days.wednesday == true) return true; 
        if (this.days.thursday == true) return true; 
        if (this.days.friday == true) return true; 
        if (this.days.saturday == true) return true; 
        if (this.days.sunday == true) return true; 
        return false; 
    }

    driverPlanned() {
        if(this.daysChecker()) {
            this.model.driver_days = this.days;
            console.log(this.days);
            this.plannedService.postDriverRide(this.model)
                               .subscribe(
                               data => {
                    //set success message and pass true paramater to persist the message after redirecting to the login page
                    //localStorage.setItem('currentDriver', JSON.stringify(Driver));
                               this.router.navigate(['/drivertype']);
             },
                               error => {
                               this.incorrect_submit = true; 
                    //Insert bad here
             });
        }
    }



}
