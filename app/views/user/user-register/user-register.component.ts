import {Component, OnInit} from "@angular/core";
import {UserProxy} from "../../../services/user-proxy.service";
import {UserStatus} from "../../../models/user/user-status";
import {UserRegister} from "../../../models/user/user-register";
import {CountryProxy} from "../../../services/proxy/country-proxy.service";

@Component({
  moduleId: module.id,
  templateUrl: 'user-register.component.html',
  styleUrls: ['user-register.component.css']
})
export class UserRegisterComponent implements OnInit {
  user: UserRegister = new UserRegister();
  statuses: Array<UserStatus>;
  search: any;

  constructor(private userProxy: UserProxy, private countryProxy: CountryProxy) {
  }

  ngOnInit(): void {
    this.userProxy.getStatuses().then(statuses => this.statuses = statuses);
  }

  onImageFilenameChange(event) {
    let file = event.srcElement.files[0];
    let data = new FormData();
    data.append('image', file);
    this.userProxy.saveImage(data).then(userImage => this.user.imageToken = userImage.oneTimeToken);
  }

  onSubmit() {
    this.userProxy.saveUser(this.user.toJsonObject())
      .then(response => {
        console.log(response);
      });
  }

  json(obj) {
    return JSON.stringify(obj);
  }

}
