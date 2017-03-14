import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
 
import { UserService } from '../_services/user.service';

export class Temp {
  name : string;  
  description : string;
  slogan : string;
  founded_date : string;
  website : string;
}


@Component({
  selector: 'app-temp-page',
  templateUrl: './temp-page.component.html',
  styleUrls: ['./temp-page.component.css']
})
export class TempPageComponent implements OnInit {
  model: Temp;


  constructor(
        private router: Router,
        private userService: UserService) { }

  ngOnInit() {
        this.model = {
          name: 'Wrong',
          description: 'Wrong', 
          slogan: 'Wrong', 
          founded_date: 'Wrong', 
          website: 'Wrong',  
        }

    this.userService
        .tempFunc()
        .subscribe(model =>{ 
            this.model = model
            console.log(model);
    });
 };
}
