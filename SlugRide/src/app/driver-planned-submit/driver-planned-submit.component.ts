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
          monday : false,
          tuesday : false,
          wednesday : false,
          thursday : false,
          friday : false,
          saturday : false,
          sunday : false  
        }
    }    

    daysChecker() {
        if (this.model.monday == true) return true; 
        if (this.model.tuesday == true) return true; 
        if (this.model.wednesday == true) return true; 
        if (this.model.thursday == true) return true; 
        if (this.model.friday == true) return true; 
        if (this.model.saturday == true) return true; 
        if (this.model.sunday == true) return true; 
        return false; 
    }

    driverPlanned() {
        if(this.daysChecker()) {
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
