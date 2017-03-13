import { Component, OnInit } from '@angular/core';
import { Driver } from '../_driver/driver';
import { UserService } from '../_services/user.service';


@Component({
  selector: 'app-driver-schedule',
  templateUrl: './driver-schedule.component.html',
  styleUrls: ['./driver-schedule.component.css']
})
export class DriverScheduleComponent implements OnInit {
    rides : Driver;
    //Rides : Driver[];

    constructor(private userService: UserService) {
        this.rides = JSON.parse(localStorage.getItem('currentDriver')); //Change function later to accomadate function
    }

    ngOnInit() {
  
    }

}

//The HTML File needs to be edited once we are connected. 