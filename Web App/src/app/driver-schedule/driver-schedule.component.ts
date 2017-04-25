import { Component, OnInit } from '@angular/core';
import { Driver } from '../_driver/driver';
import { UserService } from '../_services/user.service';
import { Router, ActivatedRoute } from '@angular/router';

import { User } from '../_user/user';
import { PlannedService } from '../_services/planned.service';

export class drivertripinfo{
  driver_location : string;
  driver_destination : string;
  driver_timeofdeparture : string;
  rider_count : number;
  monday : boolean;
  tuesday : boolean;
  wednesday : boolean;
  thursday : boolean;
  friday : boolean;
  saturday : boolean;
  sunday : boolean;
  trip_id : string;
}

@Component({
  selector: 'app-driver-schedule',
  templateUrl: './driver-schedule.component.html',
  styleUrls: ['./driver-schedule.component.css']
})
export class DriverScheduleComponent implements OnInit {
    currentUser: User;
    users: drivertripinfo[] = []; //change model 
 
    constructor(private userService: UserService,
                private router: Router,
                private plannedService: PlannedService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }
 
    ngOnInit() {
        this.loadRides(); 
        //Change Method

    }

    private loadRides() {
        //Change this object 
        this.plannedService.getAllDriverRides(this.currentUser.email).subscribe(users => { this.users = users; });
    }

    selectRide(id : string) {
      //this.plannedService.riderJoin(this.currentUser.email, this.currentUser.password) //Change second param to trip ID
      //      .subscribe(
      //          data => {
        this.plannedService.setId(id);
        this.router.navigate(['/driverindividual']);
            //    },
              //  error => {
                    //this.incorrect_login = true; 
                    //Insert Notification Here
                //});
    }


}

//The HTML File needs to be edited once we are connected. 