import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
 
import { Driver } from '../_driver/driver';
import { Rider } from '../_rider/rider';
 
export class joinRide {
    email : string;
    trip_id : string;
}

@Injectable()
export class PlannedService {
    constructor(private http: Http) { }

    //Driver Functions
    
    //Function Post a ride for a Driver
    postDriverRide(driver: Driver) {
        return this.http.post('http://localhost:8000/rideshare/new_planned_trip/', driver).map((response: Response) => response.json());
    }

    //Function get all current scheduled rides for a driver
    getAllDriverRides(email: string) {
        return this.http.post('/api/forgot', JSON.stringify({email: email})).map((response: Response) => response.json());
    }

    //Get all the riders for the scheduled ride for a driver
    getCurrentRiders(email : string, id : number) {
        return this.http.post('/api/forgot', JSON.stringify({email : email, id : id})).map((response: Response) => response.json());
    }

    //Send in a approval request for Driver
    approveRider(email : string, approved : boolean) {
        return this.http.post('/api/forgot', JSON.stringify({email : email, approved : approved})).map((response: Response) => response.json());
    }

    //Test
    //Rider Functions

    //FUnction post a ride for a rider
    postRiderRide(rider: Rider) {
        console.log(rider);
        return this.http.post('http://localhost:8000/rideshare/new_proposed_trip/', rider).map((response: Response) => response.json());
    }

    //Function to grab all the driver
    getAllCurrentPlannedDrivers() {
        return this.http.get('http://localhost:8000/rideshare/get_all_planned_trips/').map((response: Response) => response.json());
    }

    joinride : joinRide;

    //Function to join a ride for a rider
    riderJoin(email : string, trip_id : string) {
        this.joinride.email = email; 
        this.joinride.trip_id = trip_id;
        console.log(this.joinride);
        return this.http.post('http://localhost:8000/rideshare/ride_join_trip/', this.joinride).map((response: Response) => response.json());
    }

    //Function get all current scheduled rides for a Rider
    getAllRiderRides(email: string) {
        return this.http.post('/api/forgot', JSON.stringify({email: email})).map((response: Response) => response.json());
    }



    //Extra Functions
    id : number; //ID for the driver schedule and driver individual sections

    //Used in driver planned schedule to contain the id for driver indivdual
    setId(id: number) {
        this.id = id;
    } 

    //Function to grab the id for the driver indivdual function
    getid() {
        return this.id; 
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

