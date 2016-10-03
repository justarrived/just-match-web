import {Component, OnInit} from '@angular/core';

import { ApiCall } from '../../services/api-call';
import {AuthManager} from "../../services/auth-manager.service";

@Component({
  providers: [],
  templateUrl: './app/home/components/home.html'
})
export class HomeComponent implements OnInit {
  email: string;
  password: string;
  constructor(private apiCall: ApiCall, private authManager: AuthManager) {
  }

  ngOnInit() {
  }

  login() {
    this.authManager.logUser(this.email, this.password).then(user => {
      console.log(user);
    });

  }
}
