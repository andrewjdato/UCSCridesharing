import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { User } from '../_user/user';
import { UserService } from '../_services/user.service';
import { PlannedService } from '../_services/planned.service';

export class riderInfo{
    rider_email : string;
    rider_firstname : string;
    rider_lastname : string;
    rider_location : string;
    rider_destination : string;
    rider_timeofdeparture : string;
    rider_approved : boolean;
}

@Component({
  selector: 'app-driver-planned-individual',
  templateUrl: './driver-planned-individual.component.html',
  styleUrls: ['./driver-planned-individual.component.css']
})
export class DriverPlannedIndividualComponent implements OnInit {
    currentUser: User;
    users : riderInfo[]; //change model 
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
        console.log(this.id);
        console.log(Array.isArray(this.users));
        this.loadAllUsers();
        
        //console.log("check 2");
        
    }

    private loadAllUsers() {
        //Change this object
        //this.plannedService.getAllDriverRides(this.currentUser.email).subscribe(users => { this.users = users; }); 
        console.log(this.id , this.currentUser.email);
        this.plannedService.getCurrentRiders(this.currentUser.email, this.id).subscribe(users => { 
        this.users = users;
        console.log(Array.isArray(users), users)
        });
        //Change Function
        //this.plannedService.getCurrentRiders(id).subscribe(users => { this.users = users; })
    }

    approveRider(email : string, approved : boolean) {
      this.plannedService.approveRider(this.currentUser.email, email, this.id, approved) //Change second param to trip ID
                         .subscribe(
                         data => {
                            this.router.navigate(['/driverindividual']);
                         },
                         error => {
                            this.incorrect_submit = true; 
                            //Insert Notification Here
        });
    }
}
