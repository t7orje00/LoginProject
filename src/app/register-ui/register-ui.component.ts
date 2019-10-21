import { Component, OnInit } from '@angular/core';
import {HttpClient,HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { User } from '../users/user';
import { UserService } from '../users/user.service';


@Component({
  selector: 'app-register-ui',
  templateUrl: './register-ui.component.html',
  styleUrls: ['./register-ui.component.css'],
  providers: [UserService]
})
export class RegisterUiComponent implements OnInit {

  public createsuccess = 0;
  user: User = {
    name: '',
    email: '',
    pass: ''
  };

  constructor (private userService: UserService) {}

  ngOnInit() {
  }

  createUser(user: User) {
    console.log(user);
    this.userService.getUserByEmail(user.email).then((dbreturn: User) => {
      if (dbreturn == null) {
        const bcrypt = require('bcryptjs');
        let salt = bcrypt.genSaltSync(10);
        user.pass = bcrypt.hashSync(user.pass, salt);
        this.userService.createUser(user);
        this.createsuccess = 1;
        this.user = {
          name: '',
          email: '',
          pass: ''
        };
      } else {
        this.user.name = '';
        this.createsuccess = -1;
      }
    });
    setTimeout(function() {
      this.createsuccess = false;
      }.bind(this), 3000);
  }
}


