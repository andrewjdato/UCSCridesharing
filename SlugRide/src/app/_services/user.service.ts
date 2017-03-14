import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
 
import { User } from '../_user/user';
 
@Injectable()
export class UserService {
    constructor(private http: Http) { }
 
    getAll() {
        return this.http.get('/api/users', this.jwt()).map((response: Response) => response.json());
    }
 
    create(user: User) {
        return this.http.post('/api/users', user, this.jwt()).map((response: Response) => response.json());
    }
 
    update(user: User) {
        return this.http.put('/api/users/', user, this.jwt()).map((response: Response) => response.json());
    }

    check(email: string) {
        return this.http.post('/api/forgot', JSON.stringify({email: email})).map((response: Response) => response.json());
    }

    tempFunc() {
        return this.http.get('http://localhost:8000/chains/', this.jwt()).map((response: Response) => response.json());
    }


 
    // private helper methods
 
    private jwt() {
        // create authorization header with jwt token
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
            return new RequestOptions({ headers: headers });
        }
    }
}