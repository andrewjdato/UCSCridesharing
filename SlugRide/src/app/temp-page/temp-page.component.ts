import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
 
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-temp-page',
  templateUrl: './temp-page.component.html',
  styleUrls: ['./temp-page.component.css']
})
export class TempPageComponent implements OnInit {
  model: any = {};


  constructor(
        private router: Router,
        private userService: UserService) { }

  ngOnInit() {
    this.userService.tempFunc().subscribe(model => { this.model = model; });
  }

}
