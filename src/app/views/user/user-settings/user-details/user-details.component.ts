import {Component, Input, OnInit} from '@angular/core';
import {AuthManager} from '../../../../services/auth-manager.service';
import {User} from '../../../../models/user';
import {UserProxy} from '../../../../services/proxy/user-proxy.service';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {

  @Input() private user: User;

  private settingsForm: FormGroup;
  private passwordForm: FormGroup;

  private serverValidationErrors: any = {};
  private saveSuccess: boolean;
  private saveFail: boolean;
  private loadingSubmit: boolean = false;

  constructor(
    private authManager: AuthManager,
    private userProxy: UserProxy,
    private formBuilder: FormBuilder
  ) {
  }

  ngOnInit() {
    this.settingsForm = this.formBuilder.group({
      'first_name': [this.user.firstName, Validators.compose([Validators.required, Validators.minLength(2)])],
      'last_name': [this.user.lastName, Validators.compose([Validators.required, Validators.minLength(2)])],
      'email': [this.user.email, Validators.compose([Validators.required, Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)])],
      'phone': [this.user.phone, Validators.compose([Validators.required])],
      'street': [this.user.street],
      'zip': [this.user.zip],
      'city': [this.user.city],
      'account_clearing_number': [this.user.accountClearingNumber],
      'account_number': [this.user.accountNumber]
    });

    this.passwordForm = this.formBuilder.group({
      'password': [null, Validators.compose([Validators.minLength(6)])],
      'old_password': [null],
      'repeat_password': [null]
    });
  }

  private passwordsSupplied(): boolean {
    return (this.passwordForm.value.password || this.passwordForm.value.repeat_password) && true;
  }

  private passwordsSuppliedAndMisMatch(): boolean {
    return this.passwordsSupplied() && this.passwordForm.value.password !== this.passwordForm.value.repeat_password && true;
  }

  private formValidation(): boolean {
    return this.settingsForm.valid && this.passwordForm.valid && !this.passwordsSuppliedAndMisMatch() && true;
  }

  private handleServerErrors(errors): void {
    this.saveFail = true;
    this.serverValidationErrors = errors.details || errors;
  }

  private onSubmit(): void {
    this.saveSuccess = false;
    this.saveFail = false;
    this.loadingSubmit = true;
    this.serverValidationErrors = {};

    this.userProxy.updateUser(this.user.id, this.settingsForm.value)
      .then((response) => {
        if (this.passwordsSupplied()) {
          this.userProxy.changePassword(this.passwordForm.value.password, this.passwordForm.value.old_password)
            .then((response) => {
              // has to relogin to be authenticated now that password changed
              this.authManager.logUser(this.settingsForm.value.email, this.passwordForm.value.password)
                .then(result => {
                  this.passwordForm.value.old_password = '';
                  this.passwordForm.value.password = '';
                  this.passwordForm.value.repeat_password = '';
                  this.saveSuccess = true;
                  this.authManager.authenticateIfNeeded();
                  this.loadingSubmit = false;
                });
            })
            .catch(errors => {
              this.handleServerErrors(errors);
              this.loadingSubmit = false;
            });
        } else {
          this.saveSuccess = true;
          this.authManager.authenticateIfNeeded();
          this.loadingSubmit = false;
        }
      })
      .catch(errors => {
        this.handleServerErrors(errors);
        this.loadingSubmit = false;
      });
  }
}
