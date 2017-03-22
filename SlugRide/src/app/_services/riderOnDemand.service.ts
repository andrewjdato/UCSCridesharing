import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import {Riderondemand} from '../_riderondemand/riderod'
import {Driverondemand} from '../_driverondemand/driverod'


@Injectable()
export class riderodServ {
    constructor(private http: Http){}


    //submits information regarding driver ride to server
    // postRider(rider: Riderondemand){
    //     return this.http.post('/api/users', rider).map((response: Response) => response.json());
    //
    // }

    //checks to see if anyone has responded to ride
    activateR(riderx: Riderondemand){
        return this.http.post('http://localhost:8000/rideshare/rider_ondemand/', JSON.stringify({Riderondemand: riderx}))
            .map((response: Response)=> {

               // let user = response.json();



            })

    }


    //searches for any current active drivers
    getDrivers(){
        return this.http.get('http://localhost:8000/rideshare/rider_getdrivers_ondemand/').map((response: Response)=> response.json())

    }

    //sends a request for a ride to the driver
    sendRequest(riderx: Riderondemand, driveremail:string){
        return this.http.post('http://localhost:8000/rideshare/rider_request_driver/', JSON.stringify({riderod: riderx, driverodemail :driveremail}))


            .map((response: Response)=> {

                //let user = response.json();



            });
        



    }

    //gets response from driver, this function is constantly polled until response is given
    //response should send back eta and distance from driver to rider
    getResponse(rideremail:string){
        return this.http.post('/api/users',JSON.stringify({rideremail:rideremail}))
            .map((response:Response)=>{});

                //response.json())
    }


}