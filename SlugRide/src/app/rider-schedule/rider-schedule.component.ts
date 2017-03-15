import { Component, OnInit } from '@angular/core';
import { Driver } from '../_driver/driver';
import { UserService } from '../_services/user.service';
import { Router, ActivatedRoute } from '@angular/router';

import { User } from '../_user/user';
import { PlannedService } from '../_services/planned.service';

@Component({
  selector: 'app-rider-schedule',
  templateUrl: './rider-schedule.component.html',
  styleUrls: ['./rider-schedule.component.css']
})
export class RiderScheduleComponent implements OnInit {
    currentUser: User;
    users: User[] = []; //change model 
 
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
        this.plannedService.getAllRiderRides(this.currentUser.email).subscribe(users => { this.users = users; });
        //this.plannedService.getAllDriverRides(currentUser.email).subscribe(users => {this.users = users; });
    }
}
