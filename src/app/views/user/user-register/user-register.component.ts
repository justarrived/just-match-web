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
import {FormGroup, FormBuilder, Validators} from '@angular/forms';

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

  registrationForm: FormGroup;
  currentStatusInputTouched: boolean = false;
  undStatusInputTouched: boolean = false;
  countryInputTouched: boolean = false;

  constructor(private router: Router,
              private userProxy: UserProxy,
              private countryProxy: CountryProxy,
              private authManager: AuthManager,
              protected translationService: TranslationService,
              private formBuilder: FormBuilder) {
    super(translationService);

    this.registrationForm = formBuilder.group({
      'ssn': ['', Validators.compose([Validators.required, Validators.minLength(10)/*, Validators.pattern("^[\d\-]+$")*/])],
      'firstName': ['', Validators.compose([Validators.required])],
      'lastName': ['', Validators.compose([Validators.required])],
      'email': ['', Validators.compose([Validators.required, Validators.pattern("^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$")])],
      'currentStatus': ['', Validators.compose([Validators.required])],
      'atUndStatus': ['', Validators.compose([Validators.required])],
      'arrivedAt': ['', Validators.compose([Validators.required, Validators.pattern("^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$")])],
      'countryOfOrigin': ['', Validators.compose([Validators.required])],
      'phone': ['', Validators.compose([Validators.required])],
      'password': ['', Validators.compose([Validators.required])],
      'repeatPassword': [, Validators.compose([Validators.required])],
      'acceptedTermsAndConditions': ['', Validators.compose([Validators.required])]
    });
  }

  ngOnInit(): void {
    this.loadData();
    this.subcribeToFormChanges();
  }

  loadData() {
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

    this.userRegister.languageId = Number(this.translationService.getSelectedLanguage().id);
    this.userProxy.saveUser(this.userRegister.toJsonObject())
      .then(() => {
        return this.authManager.logUser(this.userRegister.email, this.userRegister.password);
      }).then(() => {
        this.router.navigate(['/user']);
      }).catch(errors => {
        this.errors = errors.details;
      });
  }

  subcribeToFormChanges() {
    const myFormValueChanges$ = this.registrationForm.valueChanges;
    myFormValueChanges$.subscribe(values => Object.assign(this.userRegister, values));
  }
}
