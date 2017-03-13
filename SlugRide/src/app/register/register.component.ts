import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
 
import { UserService } from '../_services/user.service';
 
@Component({
    moduleId: module.id,
    templateUrl: 'register.component.html'
})
 
export class RegisterComponent implements OnInit {
    model: any = {};
    incorrect_register: boolean; 
 
    constructor(
        private router: Router,
        private userService: UserService) { }
 

    ngOnInit() {
        this.incorrect_register = false; 
    }

    register() {
        this.userService.create(this.model)
            .subscribe(
                data => {
                    // set success message and pass true paramater to persist the message after redirecting to the login page

                    this.router.navigate(['/login']);
                },
                error => {
                    this.incorrect_register = true; 
                    //Insert bad here
                });
    }
}