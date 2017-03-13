import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
 
import { Driver } from '../_driver/driver';
import { Rider } from '../_rider/rider';
 
@Injectable()
export class PlannedService {
    constructor(private http: Http) { }
    //Function Post a ride for a Driver
    postDriverRide(driver: Driver) {
        return this.http.post('/api/users', driver, this.jwt()).map((response: Response) => response.json());
    }

    //FUnction post a ride for a rider
    getRiderRide(rider: Rider) {
        return this.http.post('/api/users', rider, this.jwt()).map((response: Response) => response.json());
    }

    //Function to join a ride
    riderJoin(email : string, id : string) {
        return this.http.post('/api/forgot', JSON.stringify({email: email, id : id})).map((response: Response) => response.json());
    }

    //Function to grab all the riders
    getAllDrivers() {
        return this.http.get('/api/users', this.jwt()).map((response: Response) => response.json());
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

