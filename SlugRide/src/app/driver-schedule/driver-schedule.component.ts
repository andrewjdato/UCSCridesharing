import { Component, OnInit } from '@angular/core';
import { Driver } from '../_driver/driver';
import { UserService } from '../_services/user.service';
import { Router, ActivatedRoute } from '@angular/router';

import { User } from '../_user/user';
import { PlannedService } from '../_services/planned.service';

@Component({
  selector: 'app-driver-schedule',
  templateUrl: './driver-schedule.component.html',
  styleUrls: ['./driver-schedule.component.css']
})
export class DriverScheduleComponent implements OnInit {
    currentUser: User;
    users: User[] = []; //change model 
 
    constructor(private userService: UserService,
                private router: Router,
                private plannedService: PlannedService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }
 
    ngOnInit() {
        this.loadAllUsers(); 
        //Change Method

    }

    private loadAllUsers() {
        //Change this object 
        this.userService.getAll().subscribe(users => { this.users = users; });
        //this.plannedService.getAllDriverRides(currentUser.email).subscribe(users => {this.users = users; });
    }

    selectRide() {
      //this.plannedService.riderJoin(this.currentUser.email, this.currentUser.password) //Change second param to trip ID
        //    .subscribe(
          //      data => {
                    this.router.navigate(['/driverindividual']);
            //    },
              //  error => {
                    //this.incorrect_login = true; 
                    //Insert Notification Here
                //});
    }


}

//The HTML File needs to be edited once we are connected. 