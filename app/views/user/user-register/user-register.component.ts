import {Component, OnInit} from "@angular/core";
import {UserProxy} from "../../../services/user-proxy.service";
import {UserStatus} from "../../../models/user/user-status";
import {UserRegister} from "../../../models/user/user-register";
import {CountryProxy} from "../../../services/proxy/country-proxy.service";
import {AT_UND_STATUSES} from "../../../enums/enums";
import {Country} from "../../../models/country";
import {AuthManager} from "../../../services/auth-manager.service";
import {Router} from "@angular/router";
import {namePropertyLabel} from "../../../utils/label-util";

@Component({
  moduleId: module.id,
  templateUrl: 'user-register.component.html',
  styleUrls: ['user-register.component.css']
})
export class UserRegisterComponent implements OnInit {
  namePropertyLabel: Function = namePropertyLabel;

  atUndStatuses = AT_UND_STATUSES;

  userRegister: UserRegister = new UserRegister();
  statuses: UserStatus[];
  countries: Country[];
  search: any;
  errors: any = {};

  constructor(private router: Router,
              private userProxy: UserProxy,
              private countryProxy: CountryProxy,
              private authManager: AuthManager) { }

  ngOnInit(): void {
    this.userProxy.getStatuses().then(statuses => this.statuses = statuses);
    this.countryProxy.getCountries().then(countries => this.countries = countries);
  }

  onImageFilenameChange(event) {
    let file = event.srcElement.files[0];
    let data = new FormData();
    data.append('image', file);
    this.userProxy.saveImage(data).then(userImage => this.userRegister.imageToken = userImage.oneTimeToken);
  }

  onSubmit() {
    this.errors = {};

    this.userRegister.languageId = 38; // TODO: use the interface choosen language from the user
    this.userProxy.saveUser(this.userRegister.toJsonObject())
      .then(() => {
        return this.authManager.logUser(this.userRegister.email, this.userRegister.password);
      }).then(() => {
        this.router.navigate(['/user']);
      }).catch(errors => {
        this.errors = errors;
      });
  }
}
