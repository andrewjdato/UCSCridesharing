import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
 
import { Driver } from '../_driver/driver';
import { Rider } from '../_rider/rider';
 
@Injectable()
export class PlannedService {
    constructor(private http: Http) { }

    //Driver Functions
    
    //Function Post a ride for a Driver
    postDriverRide(driver: Driver) {
        return this.http.post('/api/users', driver, this.jwt()).map((response: Response) => response.json());
    }

    //Function get all current scheduled rides for a driver
    getAllDriverRides(email: string) {
        return this.http.post('/api/forgot', JSON.stringify({email: email})).map((response: Response) => response.json());
    }

    //Get all the riders for the scheduled ride for a driver
    getCurrentRiders(id : string) {
        return this.http.post('/api/forgot', JSON.stringify({id : id})).map((response: Response) => response.json());
    }

    //Send in a approval request for Driver
    approveRider(approved : boolean) {
        return this.http.post('/api/forgot', JSON.stringify({approved : approved})).map((response: Response) => response.json());
    }


    //Rider Functions

    //FUnction post a ride for a rider
    getRiderRide(rider: Rider) {
        return this.http.post('/api/users', rider, this.jwt()).map((response: Response) => response.json());
    }

    //Function to grab all the riders
    getAllDrivers() {
        return this.http.get('/api/users', this.jwt()).map((response: Response) => response.json());
    }

    //Function to join a ride for a rider
    riderJoin(email : string, id : string) {
        return this.http.post('/api/forgot', JSON.stringify({email: email, id : id})).map((response: Response) => response.json());
    }


    private jwt() {
        // create authorization header with jwt token
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
            return new RequestOptions({ headers: headers });
        }
    }
}

