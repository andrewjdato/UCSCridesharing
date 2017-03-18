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


    //sends informat
    driverodPost(driverx: Driverondemand){
        return this.http.post('/api/users', JSON.stringify({Driverondemand: driverx}))
            .map((response: Response)=> {

                let user = response.json();



            })

    }


}