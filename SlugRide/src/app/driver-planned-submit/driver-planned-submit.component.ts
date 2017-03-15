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
      days : boolean[]; 

 
    constructor(
        private router: Router,
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
          driver_email: 'temp', 
          driver_departure: null, 
          driver_destination: null, 
          driver_timeofdeparture: null, 
          driver_days: null,  
        }
    }    

    daysChecker() {
        var counter = 0;
        for (counter = 0; counter < this.days.length; counter++) {
            if (this.days[counter] == true) return true;
        }
        return false; 
    }

    driverPlanned() {
        if(this.daysChecker()) {
                    //this.plannedService.postDriverRide(this.model)
            //.subscribe(
              //  data => {
                    // set success message and pass true paramater to persist the message after redirecting to the login page
                    //localStorage.setItem('currentDriver', JSON.stringify(Driver));
                    this.router.navigate(['/drivertype']);
                //},
               // error => {
                    //Insert bad here
               // });
        }
    }



}

/*
        <div class="form-group">
            <div class="checkbox">
              <label>
                  <input type="checkbox" name="monday" [(ngModel)]="model.driver_days[0]">
                  Monday
              </label>
            </div>
        </div>


*/