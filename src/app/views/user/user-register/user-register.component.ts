import {Component, OnInit} from '@angular/core';
import {UserProxy} from '../../../services/proxy/user-proxy.service';
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
import {FormGroup, FormBuilder, Validators} from '@angular/forms';

@Component({
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.scss']
})
export class UserRegisterComponent extends TranslationListener implements OnInit {
  private namePropertyLabel: Function = namePropertyLabel;

  private countries: Country[];
  private languages: Language[];
  private systemLanguages: Language[];
  private serverValidationErrors: any = {};
  private saveSuccess: boolean;
  private saveFail: boolean;
  private loadingSubmit: boolean = false;

  private registerForm: FormGroup;
  private countryOfOriginInputTouched: boolean = false;
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
      'email': ['', Validators.compose([Validators.required, Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)])],
      'phone': ['', Validators.compose([Validators.required])],
      'street': [''],
      'zip': [''],
      'city': [''],
      'country_of_origin': [''],
      'native_language': [''],
      'default_language': [''],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      'repeat_password': [, Validators.compose([Validators.required])],
      'accepted_terms_and_conditions': ['']
    });
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.countryProxy.getCountries().then(countries => this.countries = countries);
    this.languageProxy.getLanguages().then(languages => this.languages = languages);
    this.languageProxy.getSystemLanguages().then(languages => this.systemLanguages = languages);
  }

  private handleServerErrors(errors) {
    this.saveFail = true;
    this.serverValidationErrors = errors.details || errors;
  }

  private onSubmit() {
    this.saveSuccess = false;
    this.saveFail = false;
    this.loadingSubmit = true;
    this.serverValidationErrors = {};

    this.userProxy.saveUser({
      'first_name': this.registerForm.value.first_name,
      'last_name': this.registerForm.value.last_name,
      'email': this.registerForm.value.email,
      'phone': this.registerForm.value.phone,
      'street': this.registerForm.value.street,
      'zip': this.registerForm.value.zip,
      'city': this.registerForm.value.city,
      'country_of_origin': this.registerForm.value.country_of_origin.countryCode,
      'language_id': this.registerForm.value.default_language.id,
      'language_ids': [{
        id: this.registerForm.value.native_language.id,
        proficiency: 5
      }],
      'password': this.registerForm.value.password
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
        this.handleServerErrors(errors);
        this.loadingSubmit = false;
      });
  }

  private passwordsSupplied() {
    return (this.registerForm.value.password || this.registerForm.value.repeat_password) && true;
  }

  private passwordsSuppliedAndMisMatch() {
    return this.passwordsSupplied() && this.registerForm.value.password !== this.registerForm.value.repeat_password && true;
  }

  private formValidation(): boolean {
    return this.registerForm.valid && this.registerForm.value.accepted_terms_and_conditions && this.registerForm.value.native_language && this.registerForm.value.country_of_origin && this.registerForm.value.default_language && !this.passwordsSuppliedAndMisMatch() && true;
  }
}
