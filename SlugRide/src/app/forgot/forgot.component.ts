import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
 
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css']
})
export class ForgotComponent {
    model: any = {};

 
    constructor(
        private router: Router,
        private userService: UserService) { }
 
    forgot() {
        this.userService.check(this.model)
            .subscribe(
                data => {
                    // set success message and pass true paramater to persist the message after redirecting to the login page

                    this.router.navigate(['/login']);
                },
                error => {
                    //Insert bad here
                });
    }

}
