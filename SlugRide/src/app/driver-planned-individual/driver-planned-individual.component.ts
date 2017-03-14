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
 
    constructor(private userService: UserService,
                private router: Router,
                private plannedService: PlannedService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }
 
    ngOnInit() {
        this.loadAllUsers();
        
    }

    private loadAllUsers() {
        //Change this object 
        this.userService.getAll().subscribe(users => { this.users = users; });
        //Change Function
        //this.plannedService.getCurrentRiders(id).subscribe(users => { this.users = users; })
    }

    approveRider(approved : boolean) {
      //this.plannedService.approveRider(approved) //Change second param to trip ID
        //    .subscribe(
          //      data => {
                    this.router.navigate(['/usertype']);
            //    },
              //  error => {
                    //this.incorrect_login = true; 
                    //Insert Notification Here
                //});
    }
}
