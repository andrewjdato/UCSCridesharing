import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import {Riderondemand} from '../_riderondemand/riderod'


@Injectable()
export class riderodServ {
    constructor(private http: Http){}


    //submits information regarding driver ride to server
    postRider(rider: Riderondemand){
        return this.http.post('/api/users', rider).map((response: Response) => response.json());

    }

    //checks to see if anyone has responded to ride
    riderodPost(riderx: Riderondemand){
        return this.http.post('/api/users', JSON.stringify({Riderondemand: riderx}))
            .map((response: Response)=> {

                let user = response.json();



            })

    }



}