import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
 
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-driver-planned-submit',
  templateUrl: './driver-planned-submit.component.html',
  styleUrls: ['./driver-planned-submit.component.css']
})
export class DriverPlannedSubmitComponent {
    model: any = {};

 
    constructor(
        private router: Router,
        private userService: UserService) { }
 
    driverPlanned() {
        //this.userService.create(this.model)
            //.subscribe(
              //  data => {
                    // set success message and pass true paramater to persist the message after redirecting to the login page

                    this.router.navigate(['/drivertype']);
                //},
               // error => {
                    //Insert bad here
               // });
    }

}
