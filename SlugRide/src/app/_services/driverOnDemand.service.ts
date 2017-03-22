import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import {Driverondemand} from '../_driverondemand/driverod'

import 'rxjs/add/operator/map'

@Injectable()
export class driverodServ{
    constructor(private http: Http){}


    //submits information regarding driver ride to server
    postDriverodRide(driver: Driverondemand){
        return this.http.post('/api/users', driver).map((response: Response) => response.json());

    }


    //sends information of driver coordinates and info
    driverodPost(driverx: Driverondemand){
        return this.http.post('http://localhost:8000/rideshare/driver_ondemand_change/', JSON.stringify({Driverondemand: driverx}))


           .map((response: Response)=> {

                let user = response.json();



            })

    }

    //get request for driver, return will be rider originplaceid
    driverodRequestr(){
        return this.http.get('http://localhost:8000/rideshare/riderondemand/').map((response: Response)=> response.json())

    }

    //deactivates driver's search for riders
    deactivateDriver(){
        return this.http.post('http://localhost:8000/rideshare/user_login/', JSON.stringify({string:"deactivate"})).map((response: Response)=> response.json())
    }

    //should provide next rider, if driver does not accept
    driverodNext(){
        return this.http.get('http://localhost:8000/rideshare/riderondemand/').map((response: Response)=> response.json())

    }

    //acceptrider, driveremail rideremail are sent along with the request response Accept
    acceptRider(driveremail: string, rideremail:string, response:string){
        return this.http.post('/api/users', JSON.stringify({driveremail:driveremail,rideremail:rideremail,response: response}))
            .map((response: Response)=> {

                let user = response.json();



            })

    }
    rejectRider(driveremail: string, rideremail:string, response:string){
        return this.http.post('/api/users', JSON.stringify({driveremail:driveremail,rideremail:rideremail,response: response}))
            .map((response: Response)=> {

                let user = response.json();



            })

    }


}