import { Component, OnInit } from '@angular/core';
import { UserDataService } from './app.component.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  public view: string;
  constructor(public _userData: UserDataService) {
}

ngOnInit() {
}

setView(view: string) {
  if (this._userData.getView() !== view) {
    this._userData.setView(view);
  } else {
    this._userData.setView('start');
  }
}
}
