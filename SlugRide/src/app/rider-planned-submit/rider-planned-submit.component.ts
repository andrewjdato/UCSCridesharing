import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Rider } from '../_rider/rider';

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
      model : Rider;
      incorrect_submit : boolean;
      days = { monday : false,
              tuesday : false,
              wednesday : false,
              thursday : false, 
              friday : false, 
              saturday : false, 
              sunday : false};

 
    constructor(
        private router: Router,
        private plannedService : PlannedService) {
           this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        }

    ngOnInit() {
        this.incorrect_submit = false;
        this.model = {
          rider_email: this.currentUser.email, 
          rider_departure: null, 
          rider_destination: null, 
          rider_timeofdeparture: null, 
          rider_days: null,  
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

    riderPlanned() {
        if(this.daysChecker()) {
            this.model.rider_days = this.days;
            this.plannedService.postRiderRide(this.model)
                               .subscribe(
                               data => {
                                  this.router.navigate(['/riderplanned']);
          },
                               error => {
                                  this.incorrect_submit = true;

          });
        }
    }
}
