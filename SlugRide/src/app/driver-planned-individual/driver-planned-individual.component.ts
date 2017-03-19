import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { User } from '../_user/user';
import { UserService } from '../_services/user.service';
import { PlannedService } from '../_services/planned.service';

@Component({
  selector: 'app-driver-planned-individual',
  templateUrl: './driver-planned-individual.component.html',
  styleUrls: ['./driver-planned-individual.component.css']
})
export class DriverPlannedIndividualComponent implements OnInit {
    currentUser: User;
    users: User[] = []; //change model 
    id : string;
    incorrect_submit : boolean; 

    constructor(private userService: UserService,
                private router: Router,
                private plannedService: PlannedService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }
 
    ngOnInit() {
        this.incorrect_submit = false; 
        this.id = this.plannedService.getid();
        this.loadAllUsers();
        
    }

    private loadAllUsers() {
        //Change this object 
        this.plannedService.getCurrentRiders(this.currentUser.email, this.id).subscribe(users => { this.users = users; });
        //Change Function
        //this.plannedService.getCurrentRiders(id).subscribe(users => { this.users = users; })
    }

    approveRider(email : string, approved : boolean) {
      this.plannedService.approveRider(email, approved) //Change second param to trip ID
        .subscribe(
        data => {
            this.router.navigate(['/usertype']);
        },
        error => {
            this.incorrect_submit = true; 
                    //Insert Notification Here
            
        });
    }
}
