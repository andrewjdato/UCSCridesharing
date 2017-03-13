import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
 
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css']
})
export class ForgotComponent implements OnInit{
    model: any = {};
    incorrect_forgot: boolean; 
 
    constructor(
        private router: Router,
        private userService: UserService) { }
 
    ngOnInit() {
        this.incorrect_forgot = false; 
    }

    forgot() {
        this.userService.check(this.model)
            .subscribe(
                data => {
                    // set success message and pass true paramater to persist the message after redirecting to the login page

                    this.router.navigate(['/login']);
                },
                error => {
                    this.incorrect_forgot = true; 
                    //Insert bad here
                });
    }

}
