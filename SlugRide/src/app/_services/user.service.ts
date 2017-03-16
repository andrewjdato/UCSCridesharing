import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
 
import { User } from '../_user/user';
@Injectable()
export class UserService {
    constructor(private http: Http) { }
 
    //Get all users Not really used
    getAll() {
        return this.http.get('/api/users').map((response: Response) => response.json());
    }

    //Function to create a new user in registration. 
    create(user: User) {
        return this.http.post('http://localhost:8000/rideshare/user_registration/', user).map((response: Response) => response.json());
    }

    //Function to update a user information 
    update(user: User) {
        return this.http.put('/api/users/', user).map((response: Response) => response.json());
    }

    //This is used for the forgot password method Used to check if an email is there
    check(email: string) {
        return this.http.post('/api/forgot', JSON.stringify({email: email})).map((response: Response) => response.json());
    }

    //Temp function to test out the connection with the server
    tempFunc() {
        return this.http.get('http://localhost:8000/chains/').map((model: Response) => model.json());
    }


 
    // private helper methods
 
    private jwt() {
        // create authorization header with jwt token
        //let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        //if (currentUser && currentUser.token) {
        //    let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
        //    return new RequestOptions({ headers: headers });
       // }
    }
}