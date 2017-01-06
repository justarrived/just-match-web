import {Component, OnInit} from '@angular/core';
import {UserProxy} from '../../../services/proxy/user-proxy.service';
import {UserStatus} from '../../../models/user/user-status';
import {UserRegister} from '../../../models/user/user-register';
import {CountryProxy} from '../../../services/proxy/country-proxy.service';
import {atUndStatuses} from '../../../enums/enums';
import {Country} from '../../../models/country';
import {AuthManager} from '../../../services/auth-manager.service';
import {Router} from '@angular/router';
import {namePropertyLabel} from '../../../utils/label-util';
import {TranslationService} from '../../../services/translation.service';
import {TranslationListener} from '../../../components/translation.component';

@Component({
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.scss']
})
export class UserRegisterComponent extends TranslationListener implements OnInit {
  namePropertyLabel: Function = namePropertyLabel;

  atUndStatuses = atUndStatuses;

  userRegister: UserRegister = new UserRegister();
  statuses: UserStatus[];
  countries: Country[];
  errors: any = {};

  constructor(private router: Router,
              private userProxy: UserProxy,
              private countryProxy: CountryProxy,
              private authManager: AuthManager, protected translationService: TranslationService) {
    super(translationService);
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.userProxy.getStatuses().then(statuses => this.statuses = statuses);
    this.countryProxy.getCountries().then(countries => this.countries = countries);
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
