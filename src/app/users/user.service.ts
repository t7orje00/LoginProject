import { Injectable } from '@angular/core';
import { User } from './user';
import { Http, Response } from '@angular/http';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';


@Injectable()
export class UserService {
    private usersUrl = '/api/users';
    private nameUrl = '/name';
    private idUrl = '/id';

    constructor (private http: Http) {}


    getUsers(): Promise<void | User[]> {
      return this.http.get(this.usersUrl)
                 .toPromise()
                 .then(response => response.json() as User[])
                 .catch(this.handleError);
    }


    createUser(newUser: User): Promise<void | User> {
      return this.http.post(this.usersUrl, newUser)
                 .toPromise()
                 .then(response => response.json() as User)
                 .catch(this.handleError);
    }

/*
    deleteUser(delUserId: String): Promise<void | String> {
      return this.http.delete(this.usersUrl + '/' + delUserId)
                 .toPromise()
                 .then(response => response.json() as String)
                 .catch(this.handleError);
    }*/


    /*updateUser(putUser: User): Promise<void | User> {
      var putUrl = this.usersUrl + '/' + putUser._id;
      return this.http.put(putUrl, putUser)
                 .toPromise()
                 .then(response => response.json() as User)
                 .catch(this.handleError);
    }*/

    private handleError (error: any) {
      let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
      console.error(errMsg); // log to console instead
    }

    getUserByName(getUserName: String): Promise<void | User> {
      return this.http.get(this.usersUrl + this.nameUrl + '/' + getUserName)
                 .toPromise()
                 .then(response => response.json() as User)
                 .catch(this.handleError);
    }

}
