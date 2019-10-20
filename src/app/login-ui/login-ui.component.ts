import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { UserService } from '../users/user.service';
import { User } from '../users/user';
import { Login } from '../users/login';
import {UserDataService} from 'app/app.component.service';


@Component({
  selector: 'app-login-ui',
  templateUrl: './login-ui.component.html',
  styleUrls: ['./login-ui.component.css'],
  providers: [UserService]
})
export class LoginUiComponent {

  loginUser: Login = {
    name: '',
    pass: ''
  };

  dbUser: User = {
    name: '',
    pass: '',
    email: ''
  };
  loginsuccess = 0;
  constructor(
    private userService: UserService,
    public _userData: UserDataService) { }

  loginAttempt(loginUser: User) {
      this.userService.getUserByName(loginUser.name).then((dbuser: User) => {
        const bcrypt = require('bcryptjs');
        if (dbuser == null) {
          this.loginsuccess = -1;
          this.loginUser.pass = '';
        } else {
          bcrypt.compare(loginUser.pass, dbuser.pass).then(res => {
            if (res === true) {
              this.loginsuccess = 1;
              this._userData.setUserData(dbuser);
              this.loginUser = {
              name: '',
              pass: ''
              };
              this._userData.setView('start');
            } else {
              this.loginsuccess = -1;
              this.loginUser.pass = '';
              }
              setTimeout(function() {
                this.loginsuccess = 0;
                }.bind(this), 3000);
          });
        }
      });
  }
}
