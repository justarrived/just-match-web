import {ApiErrors} from '../../../models/api-errors';
import {AuthManager} from '../../../services/auth-manager.service';
import {Component} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {FormGroup} from '@angular/forms';
import {Input} from '@angular/core';
import {OnInit} from '@angular/core';
import {User} from '../../../models/user';
import {UserProxy} from '../../../services/proxy/user-proxy.service';
import {Validators} from '@angular/forms';
import {UserGender} from '../../../models/user/user-gender';

@Component({
  selector: 'user-details-form',
  templateUrl: './user-details-form.component.html',
  styleUrls: ['./user-details-form.component.scss']
})
export class UserDetailsFormComponent implements OnInit {
  @Input() user: User;
  public genders: Promise<UserGender[]>;
  public apiErrors: ApiErrors = new ApiErrors([]);
  public loadingSubmit: boolean = false;
  public passwordForm: FormGroup;
  public saveFail: boolean;
  public saveSuccess: boolean;
  public settingsForm: FormGroup;

  constructor(
    private authManager: AuthManager,
    private userProxy: UserProxy,
    private formBuilder: FormBuilder
  ) {
  }

  ngOnInit() {
    this.initSettingsForm();
    this.initPasswordForm();
    this.loadData();
  }

  loadData() {
    this.genders = this.userProxy.getGenders();
  }

  private initSettingsForm() {
    this.settingsForm = this.formBuilder.group({
      'first_name': [this.user.firstName, Validators.compose([Validators.required, Validators.minLength(2)])],
      'last_name': [this.user.lastName, Validators.compose([Validators.required, Validators.minLength(2)])],
      'email': [this.user.email, Validators.compose([Validators.required])],
      'phone': [this.user.phone, Validators.compose([Validators.required])],
      'gender': [this.user.gender, Validators.compose([Validators.required])],
      'street': [this.user.street],
      'zip': [this.user.zip],
      'city': [this.user.city],
      'account_clearing_number': [this.user.accountClearingNumber],
      'account_number': [this.user.accountNumber]
    });
  }

  private initPasswordForm() {
    this.passwordForm = this.formBuilder.group({
      'password': ['', Validators.compose([Validators.minLength(6)])],
      'old_password': [''],
      'repeat_password': ['']
    });
  }

  passwordsSupplied(): boolean {
    return (this.passwordForm.value.password || this.passwordForm.value.repeat_password) && true;
  }

  passwordsSuppliedAndMisMatch(): boolean {
    return this.passwordsSupplied() && this.passwordForm.value.password !== this.passwordForm.value.repeat_password &&
      true;
  }

  formValidation(): boolean {
    return this.settingsForm.valid && this.passwordForm.valid && !this.passwordsSuppliedAndMisMatch() && true;
  }

  private handleServerErrors(errors): void {
    this.saveFail = true;
    this.apiErrors = errors;
  }

  onSubmit(): void {
    this.saveSuccess = false;
    this.saveFail = false;
    this.loadingSubmit = true;
    this.apiErrors = new ApiErrors([]);

    this.userProxy.updateUser(this.user.id, this.settingsForm.value)
      .then((response) => {
        if (this.passwordsSupplied()) {
          this.userProxy.changePassword(this.passwordForm.value.password, this.passwordForm.value.old_password)
            .then((response) => {
              // has to relogin to be authenticated now that password changed
              this.authManager.logUser(this.settingsForm.value.email, this.passwordForm.value.password)
                .then(result => {
                  this.authManager.authenticateIfNeeded().then(() => {
                    this.passwordForm.value.old_password = '';
                    this.passwordForm.value.password = '';
                    this.passwordForm.value.repeat_password = '';
                    this.saveSuccess = true;
                    this.loadingSubmit = false;
                  });
                });
            })
            .catch(errors => {
              this.handleServerErrors(errors);
              this.loadingSubmit = false;
            });
        } else {
          this.authManager.authenticateIfNeeded().then(() => {
            this.saveSuccess = true;
            this.loadingSubmit = false;
          });
        }
      })
      .catch(errors => {
        this.handleServerErrors(errors);
        this.loadingSubmit = false;
      });
  }
}
