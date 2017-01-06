import {Component, Input} from '@angular/core';
import {AuthManager} from '../../../../services/auth-manager.service';
import {User} from '../../../../models/user';
import {UserProxy} from '../../../../services/proxy/user-proxy.service';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent {

  @Input() user: User;

  settingsForm: FormGroup;

  serverValidationErrors: any = {};
  saveSuccess: boolean;
  saveFail: boolean;

  constructor(private authManager: AuthManager, private userProxy: UserProxy, private formBuilder: FormBuilder) {
    this.settingsForm = formBuilder.group({
      'first-name-input': [null, Validators.compose([Validators.required, Validators.minLength(2)])],
      'last-name-input': [null, Validators.compose([Validators.required, Validators.minLength(2)])],
      'email-input': [null, Validators.compose([Validators.required])],
      'phone-input': [null, Validators.compose([Validators.required, Validators.minLength(9), Validators.pattern(/\+46.*/)])],
      'new-password-input': [null, Validators.compose([Validators.minLength(6)])],
      'old-password-input': [null],
      'repeat-password-input': [null]
    });
  }

  passwordsSupplied() {
    return (this.user.newPassword || this.user.repeatedPassword) && true;
  }

  passwordsSuppliedAndMisMatch() {
    return this.passwordsSupplied() && this.user.newPassword !== this.user.repeatedPassword && true;
  }

  formValidation(): boolean {
    return this.settingsForm.valid && !this.passwordsSuppliedAndMisMatch() && true;
  }

  handleServerErrors(errors) {
    this.saveFail = true;
    this.serverValidationErrors = errors.details || errors;
  }

  onSubmit() {
    this.saveSuccess = false;
    this.saveFail = false;
    this.userProxy.updateUser(this.user.toJsonObject())
      .then((response) => {
        if (this.passwordsSupplied()) {
          this.userProxy.changePassword(this.user.newPassword, this.user.oldPassword)
            .then((response) => {
              // has to relogin to be authenticated now that password changed
              this.authManager.logUser(this.user.email, this.user.newPassword)
                .then(result => {
                  this.user.oldPassword = '';
                  this.user.newPassword = '';
                  this.user.repeatedPassword = '';
                  this.saveSuccess = true;
                });
            })
            .catch(errors => {
              this.handleServerErrors(errors);
            });
        } else {
          this.saveSuccess = true;
        }
      })
      .catch(errors => {
        this.handleServerErrors(errors);
      });
  }
}
