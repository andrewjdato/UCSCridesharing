import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
 
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-account-edit',
  templateUrl: './account-edit.component.html',
  styleUrls: ['./account-edit.component.css']
})
export class AccountEditComponent {
    model: any = {};

 
    constructor(
        private router: Router,
        private userService: UserService) { }
 
    accountEdit() {
        //this.userService.create(this.model)
            //.subscribe(
              //  data => {
                    // set success message and pass true paramater to persist the message after redirecting to the login page

                    this.router.navigate(['/account']);
                //},
               // error => {
                    //Insert bad here
               // });
    }

}
