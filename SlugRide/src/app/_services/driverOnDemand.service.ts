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
        return this.http.post('http://localhost:8000/rideshare/driver_ondemand_change', JSON.stringify({Driverondemand: driverx}))
            .map((response: Response)=> 
                let user = response.json());

    }

    driverodRequestr(){
        return this.http.get('http://localhost:8000/rideshare/riderondemand/').map((response: Response)=> response.json())

    }

    //should provide next rider, if driver does not accept
    driverodNext(){
        return this.http.get('http://localhost:8000/rideshare/riderondemand/').map((response: Response)=> response.json())

    }

    //acceptrider
    acceptRider(){
        return this.http.post('/api/users', JSON.stringify({boolean:true}))
            .map((response: Response)=> {

                let user = response.json();



            })

    }


}