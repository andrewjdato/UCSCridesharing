import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import {Riderondemand} from '../_riderondemand/Riderondemand'


@Injectable()
export class driverOnDemand{
    constructor(private http: Http){}


    //submits information regarding driver ride to server
    postDriverodRide(rider: Riderondemand){
        return this.http.post('/api/users', rider).map((response: Response) => response.json());

    }

    //checks to see if anyone has responded to ride
    driverodCheck(){


    }


}