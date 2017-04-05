import {AlreadyRegisteredModalComponent} from '../../modals/already-registered-modal/already-registered-modal.component';
import {ApiErrors} from '../../../models/api-models/api-errors/api-errors';
import {ChangeDetectorRef} from '@angular/core';
import {Component} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {FormGroup} from '@angular/forms';
import {Input} from '@angular/core';
import {JARoutes} from '../../../routes/ja-routes/ja-routes';
import {NavigationService} from '../../../services/navigation.service';
import {OnInit} from '@angular/core';
import {User} from '../../../models/api-models/user/user';
import {UserProxy} from '../../../proxies/user/user.proxy';
import {UserResolver} from '../../../resolvers/user/user.resolver';
import {Validators} from '@angular/forms';
import {ViewChild} from '@angular/core';

@Component({
  selector: 'register-form',
  templateUrl: './register-form.component.html'
})
export class RegisterFormComponent implements OnInit {
  @Input() public navigateToHomeOnRegister: boolean = true;
  @Input() public showSubmitButton: boolean = true;

  @ViewChild('alreadyRegisteredModalComponent') public alreadyRegisteredModalComponent: AlreadyRegisteredModalComponent;

  public apiErrors: ApiErrors = new ApiErrors([]);
  public JARoutes = JARoutes;
  public loadingSubmit: boolean = false;
  public registerForm: FormGroup;
  public submitFail: boolean;
  public submitSuccess: boolean;
  public takenEmailOrPhone: string;

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
      'accepted_terms_and_conditions': [false, Validators.compose([Validators.required])],
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

  public submitForm(): Promise<User> {
    this.apiErrors = new ApiErrors([]);
    this.loadingSubmit = true;
    this.submitFail = false;
    this.submitSuccess = false;

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
      .then(user => {
        if (this.navigateToHomeOnRegister) {
          this.navigationService.navigate(JARoutes.home);
        }
        this.loadingSubmit = false;
        return user;
      })
      .catch(errors => {
        this.handleServerErrors(errors);
        this.navigationService.navigate(JARoutes.login);
        throw errors;
      });
    })
    .catch(errors => {
      this.handleServerErrors(errors);
      this.showAccountAlreadyExistsModalIfEmailOrPhoneTaken(errors);
      throw errors;
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
      this.takenEmailOrPhone = this.registerForm.value.email;
      this.alreadyRegisteredModalComponent.show();
    } else if (errors.hasErrorWithType('phone', 'taken')) {
      this.takenEmailOrPhone = this.registerForm.value.phone;
      this.alreadyRegisteredModalComponent.show();
    }
  }
}
