import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
 
import { AuthService } from '../_services/auth.service';
import { User } from '../_user/user'
@Component({
    moduleId: module.id,
    templateUrl: 'login.component.html'
})
 
export class LoginComponent implements OnInit {
    model: any = {};
    returnUrl: string;
    incorrect_login: boolean; 
    currentUser : User;
 
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthService) { }
 
    ngOnInit() {
        // reset login status
        this.authenticationService.logout();
        this.incorrect_login = false; 
        // get return url from route parameters or default to '/'
    }
 
    login() {
        this.authenticationService.login(this.model.email, this.model.password)
            .subscribe(
                data => {
                    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
                    console.log(this.currentUser.email != this.model.email);
                    if (this.currentUser.email != this.model.email) {
                        this.incorrect_login = true; 
                        console.log('Error');
                    } else {
                        this.router.navigate(['/usertype']);
                        console.log('Success');
                    }                 
                },
                error => {
                    this.incorrect_login = true; 
                    //Insert Notification Here
                });
    }
}