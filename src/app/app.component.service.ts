import { Injectable } from '@angular/core';
import { User } from './users/user';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  user: User = null;
  view = 'start';

  constructor (private http: HttpClient) {}

  getUserData() {
    return this.user;
  }
  setUserData(data: User) {
    this.user = data;
  }

  getView() {
    return this.view;
  }
  setView(data: string) {
    this.view = data;
  }
}
