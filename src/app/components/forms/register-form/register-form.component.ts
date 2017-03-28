import {ApiErrors} from '../../../models/api-models/api-errors/api-errors';
import {ChangeDetectorRef} from '@angular/core';
import {Component} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {FormGroup} from '@angular/forms';
import {JARoutes} from '../../../routes/ja-routes';
import {NavigationService} from '../../../services/navigation.service';
import {OnInit} from '@angular/core';
import {UserProxy} from '../../../proxies/user/user.proxy';
import {UserResolver} from '../../../resolvers/user/user.resolver';
import {Validators} from '@angular/forms';

@Component({
  selector: 'register-form',
  templateUrl: './register-form.component.html'
})
export class RegisterFormComponent implements OnInit {
  public apiErrors: ApiErrors = new ApiErrors([]);
  public loadingSubmit: boolean = false;
  public registerForm: FormGroup;
  public submitFail: boolean;
  public submitSuccess: boolean;

  public constructor(
    private changeDetector: ChangeDetectorRef,
    private formBuilder: FormBuilder,
    private navigationService: NavigationService,
    private userProxy: UserProxy,
    private userResolver: UserResolver,
  ) {
  }

  public ngOnInit(): void {
    this.initForm();
  }

  private initForm() {
    this.registerForm = this.formBuilder.group({
      'accepted_terms_and_conditions': ['', Validators.compose([Validators.required])],
      'city': [''],
      'country_of_origin': [''],
      'email': ['', Validators.compose([Validators.required])],
      'first_name': ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'gender': [''],
      'system_language_id': ['', Validators.compose([Validators.required])],
      'last_name': ['', Validators.compose([Validators.required, Validators.minLength(2)])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      'phone': [''],
      'street': [''],
      'zip': ['', Validators.compose([Validators.minLength(5)])]
    });
  }

  private handleServerErrors(errors): void {
    this.submitFail = true;
    this.apiErrors = errors;
    this.loadingSubmit = false;
    this.changeDetector.detectChanges();
  }

  public onSubmit() {
    this.apiErrors = new ApiErrors([]);
    this.loadingSubmit = true;
    this.submitFail = false;
    this.submitSuccess = false;

    this.userProxy.createUser({
      'city': this.registerForm.value.city,
      'consent': this.registerForm.value.accepted_terms_and_conditions !== '',
      'country_of_origin': this.registerForm.value.country_of_origin,
      'email': this.registerForm.value.email,
      'first_name': this.registerForm.value.first_name,
      'gender': this.registerForm.value.gender,
      'system_language_id': this.registerForm.value.system_language_id,
      'last_name': this.registerForm.value.last_name,
      'password': this.registerForm.value.password,
      'phone': this.registerForm.value.phone,
      'street': this.registerForm.value.street,
      'zip': this.registerForm.value.zip,
    })
    .then(response => {
      this.submitSuccess = true;
      this.userResolver.login(this.registerForm.value.email, this.registerForm.value.password)
      .then(response => {
        this.navigationService.navigate(JARoutes.home);
        this.loadingSubmit = false;
      })
      .catch(errors => {
        this.handleServerErrors(errors);
        this.navigationService.navigate(JARoutes.login);
      });
    })
    .catch(errors => {
      this.handleServerErrors(errors);
    });
  }
}
