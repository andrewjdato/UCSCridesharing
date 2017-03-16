import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import {Driverondemand} from '../_driverondemand/Driverondemand'


@Injectable()
export class driverOnDemand{
    constructor(private http: Http){}


    //submits information regarding driver ride to server
    postDriverodRide(driver: Driverondemand){
        return this.http.post('/api/users', driver).map((response: Response) => response.json());

    }

    //checks to see if anyone has responded to ride
    driverodCheck(){


    }


}