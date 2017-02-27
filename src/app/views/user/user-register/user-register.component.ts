import {Component, OnInit} from '@angular/core';
import {UserProxy} from '../../../services/proxy/user-proxy.service';
import {UserGender} from '../../../models/user/user-gender';
import {CountryProxy} from '../../../services/proxy/country-proxy.service';
import {LanguageProxy} from '../../../services/proxy/language-proxy.service';
import {Country} from '../../../models/country';
import {Language} from '../../../models/language/language';
import {AuthManager} from '../../../services/auth-manager.service';
import {Router} from '@angular/router';
import {namePropertyLabel} from '../../../utils/label-util';
import {NavigationService} from '../../../services/navigation.service';
import {JARoutes} from '../../../routes/ja-routes';
import {TranslationService} from '../../../services/translation.service';
import {TranslationListener} from '../../../components/translation.component';
import {FormGroup, FormBuilder, FormControl, Validators} from '@angular/forms';
import {ApiErrors} from '../../../models/api-errors';

@Component({
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.scss']
})
export class UserRegisterComponent extends TranslationListener implements OnInit {
  private namePropertyLabel: Function = namePropertyLabel;

  private countries: Country[];
  private languages: Language[];
  private genders: UserGender[];
  private systemLanguages: Language[];
  private apiErrors: ApiErrors = new ApiErrors([]);
  private saveSuccess: boolean;
  private saveFail: boolean;
  private loadingSubmit: boolean = false;

  private registerForm: FormGroup;
  private countryOfOriginInputTouched: boolean = false;
  private genderInputTouched: boolean = false;
  private nativeLanguageInputTouched: boolean = false;
  private defaultLanguageInputTouched: boolean = false;

  constructor(
    private router: Router,
    private userProxy: UserProxy,
    private countryProxy: CountryProxy,
    private languageProxy: LanguageProxy,
    private authManager: AuthManager,
    private formBuilder: FormBuilder,
    private navigationService: NavigationService,
    protected translationService: TranslationService
  ) {
    super(translationService)

    this.registerForm = formBuilder.group({
      'first_name': ['', Validators.compose([Validators.required, Validators.minLength(2)])],
      'last_name': ['', Validators.compose([Validators.required, Validators.minLength(2)])],
      'gender': ['', Validators.compose([Validators.required])],
      'email': ['', Validators.compose([Validators.required, Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)])],
      'phone': ['', Validators.compose([Validators.required])],
      'street': [''],
      'zip': ['', Validators.compose([Validators.minLength(5)])],
      'city': [''],
      'country_of_origin': ['', Validators.compose([Validators.required])],
      'native_language': ['', Validators.compose([Validators.required])],
      'language': ['', Validators.compose([Validators.required])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      'repeat_password': [, Validators.compose([Validators.required])],
      'accepted_terms_and_conditions': ['', Validators.compose([Validators.required])]
    });

    for(let control in this.registerForm.controls) {
      this.registerForm.controls[control].valueChanges.subscribe(() => this.apiErrors.resetErrorsFor(control));
    }
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.userProxy.getGenders().then(genders => this.genders = genders);
    this.countryProxy.getCountries().then(countries => this.countries = countries);
    this.languageProxy.getLanguages().then(languages => this.languages = languages);
    this.languageProxy.getSystemLanguages().then(languages => this.systemLanguages = languages);
  }

  private onSubmit() {
    this.saveSuccess = false;
    this.saveFail = false;
    this.loadingSubmit = true;
    this.apiErrors = new ApiErrors([]);

    this.userProxy.saveUser({
      'first_name': this.registerForm.value.first_name,
      'last_name': this.registerForm.value.last_name,
      'gender': this.registerForm.value.gender,
      'email': this.registerForm.value.email,
      'phone': this.registerForm.value.phone,
      'street': this.registerForm.value.street,
      'zip': this.registerForm.value.zip,
      'city': this.registerForm.value.city,
      'country_of_origin': this.registerForm.value.country_of_origin,
      'language_id': this.registerForm.value.language,
      'language_ids': [{
        id: this.registerForm.value.native_language,
        proficiency: 5
      }],
      'password': this.registerForm.value.password,
      'consent': this.registerForm.value.accepted_terms_and_conditions !== ''
    })
      .then((response) => {
        this.saveSuccess = true;
        this.authManager.logUser(this.registerForm.value.email, this.registerForm.value.password)
        .then((response) => {
          this.navigationService.navigate(JARoutes.home);
          this.loadingSubmit = false;
        });
      })
      .catch(errors => {
        this.saveFail = true;
        this.loadingSubmit = false;
        this.apiErrors = errors;
      });
  }

  private passwordsSupplied() {
    return (this.registerForm.value.password || this.registerForm.value.repeat_password) && true;
  }

  private passwordsSuppliedAndMisMatch() {
    return this.passwordsSupplied() && this.registerForm.value.password !== this.registerForm.value.repeat_password && true;
  }

  private formValidation(): boolean {
    return this.registerForm.valid && this.registerForm.value.accepted_terms_and_conditions && !this.passwordsSuppliedAndMisMatch() && true;
  }
}
