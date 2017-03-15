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
      //model : any = {};
      currentUser: User;
      model : rider;
      days : boolean[]; 

 
    constructor(
        private router: Router,
        private plannedService : PlannedService,
        private userService: UserService) {
           this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        }

    ngOnInit() {
        this.days = new Array(7);
        this.days[0] = false;
        this.days[1] = false;
        this.days[2] = false;
        this.days[3] = false;
        this.days[4] = false;
        this.days[5] = false;
        this.days[6] = false;
        this.model = {
          rider_email: 'temp', 
          rider_departure: null, 
          rider_destination: null, 
          rider_timeofdeparture: null, 
          rider_days: null,  
        }
    }    

    daysChecker() {
        var counter = 0;
        for (counter = 0; counter < this.days.length; counter++) {
            if (this.days[counter] == true) return true;
        }
        return false; 
    }

    riderPlanned() {
        if(this.daysChecker()) {
            this.model.rider_days = this.days;
            console.log(this.model);
            //this.plannedService.postriderRide(this.model)
            //                   .subscribe(
            //                   data => {
                    // set success message and pass true paramater to persist the message after redirecting to the login page
                    //localStorage.setItem('currentrider', JSON.stringify(rider));
                               this.router.navigate(['/riderplanned']);
             //   },
             //                   error => {
                    //Insert bad here
             //   });
        }
    }
}
