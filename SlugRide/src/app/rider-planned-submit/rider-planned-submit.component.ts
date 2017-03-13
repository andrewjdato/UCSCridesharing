import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Rider } from '../_rider/rider';

import { UserService } from '../_services/user.service';
import { PlannedService } from '../_services/planned.service';
import { User } from '../_user/user';

@Component({
  selector: 'app-rider-planned-submit',
  templateUrl: './rider-planned-submit.component.html',
  styleUrls: ['./rider-planned-submit.component.css']
})
export class RiderPlannedSubmitComponent {
      currentUser: User;
      model : Rider;

 
    constructor(
        private router: Router,
        private userService: UserService) {
           this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        }

    ngOnInit() {
        this.model = {
          rider_email: this.currentUser.email, 
          rider_departure: null, 
          rider_destination: null, 
          rider_timeofdeparture: null, 
          rider_days: null,  
        }
    }    
 
    riderPlanned() {
        //this.plannedService.getRiderRide(this.model)
            //.subscribe(
              //  data => {
                    // set success message and pass true paramater to persist the message after redirecting to the login page
                    this.router.navigate(['/riderplanned']);
                //},
               // error => {
                    //Insert bad here
               // });
    }
}
