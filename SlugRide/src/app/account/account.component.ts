import { Component, OnInit } from '@angular/core';

import { User } from '../_models/models';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
    currentUser: User;
 
    constructor(private userService: UserService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

  ngOnInit() {
  }

}
