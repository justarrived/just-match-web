import {Component, OnInit} from "@angular/core";
import {UserProxy} from "../../../services/user-proxy.service";

@Component({
  moduleId: module.id,
  templateUrl: 'user-register.component.html',
  styleUrls: ['user-register.component.css']
})
export class UserRegisterComponent implements OnInit {
  statuses: any;

  constructor(private userProxy: UserProxy) {

  }

  ngOnInit(): void {
    this.userProxy.getStatuses().then(response => this.statuses = response.data);
  }

}
