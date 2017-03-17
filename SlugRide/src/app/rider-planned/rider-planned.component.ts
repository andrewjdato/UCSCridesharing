import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { User } from '../_user/user';
import { UserService } from '../_services/user.service';
import { PlannedService } from '../_services/planned.service';

export class driverInfo {
    first_name : string;
    last_name : string;
    driver_location : string;
    driver_destination : string;
    driver_timeofdeparture : string;
    monday : boolean;
    tuesday : boolean;
    wednesday : boolean;
    thursday : boolean;
    friday : boolean;
    saturday : boolean;
    sunday : boolean; 
    trip_id : number;
}

@Component({
  selector: 'app-rider-planned',
  templateUrl: './rider-planned.component.html',
  styleUrls: ['./rider-planned.component.css']
})
export class RiderPlannedComponent implements OnInit {

    currentUser: User;
    users: driverInfo[] = []; //change model 
    incorrect_submit : boolean;
 
    constructor(private userService: UserService,
                private router: Router,
                private plannedService: PlannedService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }
 
    ngOnInit() {
        this.loadAllUsers();
        this.incorrect_submit = false;
    }

    private loadAllUsers() {
        //Change this object 
        this.plannedService.getAllCurrentPlannedDrivers().subscribe(users => { this.users = users; });
    }

    joinRide(id : number) {
      console.log(id);
      this.plannedService.riderJoin(this.currentUser.email, id) //Change second param to trip ID
                         .subscribe(
                         data => {
                            this.router.navigate(['/ridertype']);
                         },
                         error => {
                            this.incorrect_submit = true; 
                            //Insert Notification Here
        });
    }

}
