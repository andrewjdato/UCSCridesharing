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
    riderPlanned() {
        if(this.daysChecker()) {
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
