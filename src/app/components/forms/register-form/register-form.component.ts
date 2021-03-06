import {AnalyticsActions} from '../../../services/analytics.service';
import {AnalyticsService} from '../../../services/analytics.service';
import {ApiErrors} from '../../../models/api-models/api-errors/api-errors';
import {BaseComponent} from '../../base.component';
import {ChangeDetectorRef} from '@angular/core';
import {Component} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {FormGroup} from '@angular/forms';
import {Input} from '@angular/core';
import {ModalService} from '../../../services/modal.service';
import {NavigationService} from '../../../services/navigation.service';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
import {User} from '../../../models/api-models/user/user';
import {UserProxy} from '../../../proxies/user/user.proxy';
import {UserResolver} from '../../../resolvers/user/user.resolver';
import {Validators} from '@angular/forms';

@Component({
  selector: 'register-form',
  templateUrl: './register-form.component.html'
})
export class RegisterFormComponent extends BaseComponent {
  @Input() public navigateOnSubmit: boolean = true;
  @Input() public isInModal: boolean = false;

  public apiErrors: ApiErrors = new ApiErrors([]);
  public loadingSubmit: boolean = false;
  public registerForm: FormGroup;
  public submitFail: boolean;
  public submitSuccess: boolean;

  public constructor(
    private analyticsService: AnalyticsService,
    private changeDetector: ChangeDetectorRef,
    private formBuilder: FormBuilder,
    private modalService: ModalService,
    private navigationService: NavigationService,
    private userProxy: UserProxy,
    protected systemLanguagesResolver: SystemLanguagesResolver,
    protected userResolver: UserResolver,
  ) {
    super(systemLanguagesResolver, userResolver);
  }

  public onInit(): void {
    this.initForm();
  }

  private initForm() {
    this.registerForm = this.formBuilder.group({
      'accepted_terms_and_conditions': ['', Validators.compose([Validators.required])],
      'city': [''],
      'country_of_origin': [''],
      'email': ['', Validators.compose([Validators.required, Validators.email])],
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

  public loginButonClicked(): void {
    if (this.isInModal) {
      this.modalService.showModal('loginModalComponent', this.navigateOnSubmit, false, 400);
    } else {
      this.navigationService.navigate(this.JARoutes.login);
    }
  }

  public submitForm(): Promise<User> {
    this.apiErrors = new ApiErrors([]);
    this.loadingSubmit = true;
    this.submitFail = false;
    this.submitSuccess = false;

    this.analyticsService.publishEvent(AnalyticsActions.CreateUserTry);

    return this.userProxy.createUser({
      'city': this.registerForm.value.city,
      'consent': this.registerForm.value.accepted_terms_and_conditions,
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

      return this.userResolver.login(this.registerForm.value.email, this.registerForm.value.password)
      .catch(errors => {
        this.navigationService.navigate(this.JARoutes.login);
        throw errors;
      });
    })
    .then(user => {
      this.analyticsService.publishEvent(AnalyticsActions.CreateUserSuccess, {
        user: user.id
      });

      if (this.navigateOnSubmit) {
        this.navigationService.navigate(this.JARoutes.home);
      }
      this.modalService.showModal('welcomeStep1ModalComponent', false, false, this.isInModal ? 400 : 1);
      this.loadingSubmit = false;
      return user;
    })
    .catch(errors => {
      this.handleServerErrors(errors);
      this.showAccountAlreadyExistsModalIfEmailOrPhoneTaken(errors);

      this.analyticsService.publishEvent(AnalyticsActions.CreateUserFail);

      if (this.isInModal) {
        throw errors;
      }
      return null;
    });
  }

  private handleServerErrors(errors: ApiErrors): void {
    this.submitFail = true;
    this.apiErrors = errors;
    this.loadingSubmit = false;
    this.changeDetector.detectChanges();
  }

  private showAccountAlreadyExistsModalIfEmailOrPhoneTaken(errors: ApiErrors): void {
    if (errors.hasErrorWithType('email', 'taken')) {
      this.modalService.showModal('alreadyRegisteredModalComponent', this.navigateOnSubmit, false, this.isInModal ? 400 : 1, this.registerForm.value.email);
    } else if (errors.hasErrorWithType('phone', 'taken')) {
      this.modalService.showModal('alreadyRegisteredModalComponent', this.navigateOnSubmit, false, this.isInModal ? 400 : 1, this.registerForm.value.phone);
    }
  }
}
