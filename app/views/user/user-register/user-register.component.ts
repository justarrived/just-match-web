import {Component, OnInit} from "@angular/core";
import {UserProxy} from "../../../services/user-proxy.service";
import {UserStatus} from "../../../models/user/user-status";
import {UserRegister} from "../../../models/user/user-register";
import {CountryProxy} from "../../../services/proxy/country-proxy.service";
import {AT_UND_STATUSES} from "../../../enums/enums";
import {Country} from "../../../models/country";

@Component({
  moduleId: module.id,
  templateUrl: 'user-register.component.html',
  styleUrls: ['user-register.component.css']
})
export class UserRegisterComponent implements OnInit {
  user: UserRegister = new UserRegister();
  statuses: Array<UserStatus>;
  atUndStatuses = AT_UND_STATUSES;
  countries: Array<Country>;
  search: any;
  errors: any = {};

  constructor(private userProxy: UserProxy, private countryProxy: CountryProxy) {
  }

  ngOnInit(): void {
    this.userProxy.getStatuses().then(statuses => this.statuses = statuses);
    this.countryProxy.getCountries().then(countries => this.countries = countries);
  }

  onImageFilenameChange(event) {
    let file = event.srcElement.files[0];
    let data = new FormData();
    data.append('image', file);
    this.userProxy.saveImage(data).then(userImage => this.user.imageToken = userImage.oneTimeToken);
  }

  onSubmit() {
    this.errors = {};

    this.user.languageId = 38; // TODO: use the interface choosen language from the user
    this.userProxy.saveUser(this.user.toJsonObject())
      .then(response => {
        console.log(response);
      }, errors => {
        this.errors = errors;
      });
  }
}
