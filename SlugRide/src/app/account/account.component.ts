import { Component, OnInit } from '@angular/core';

import { User } from '../_user/user';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
    currentUser: any = {};
    driver_rating: number;
    rides_given: number; 
    rider_rating: number;
    rides_taken: number; 
    
 
    constructor(private userService: UserService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

  ngOnInit() {
    this.driver_rating = 5; 
    this.rides_given = 19; 
    this.rider_rating = 5; 
    this.rides_taken = 10; 
  }

}
