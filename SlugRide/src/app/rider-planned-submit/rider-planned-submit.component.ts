import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
 
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-rider-planned-submit',
  templateUrl: './rider-planned-submit.component.html',
  styleUrls: ['./rider-planned-submit.component.css']
})
export class RiderPlannedSubmitComponent {
    model: any = {};

 
    constructor(
        private router: Router,
        private userService: UserService) { }
 
    riderPlanned() {
        //this.userService.create(this.model)
            //.subscribe(
              //  data => {
                    // set success message and pass true paramater to persist the message after redirecting to the login page

                    this.router.navigate(['/ridertype']);
                //},
               // error => {
                    //Insert bad here
               // });
    }

}
