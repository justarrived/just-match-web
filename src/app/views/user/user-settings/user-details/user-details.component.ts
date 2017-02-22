import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {AuthManager} from '../../../../services/auth-manager.service';
import {User} from '../../../../models/user';
import {UserProxy} from '../../../../services/proxy/user-proxy.service';
import {AutocompleteDropdownComponent} from '../../../../components/autocomplete-dropdown/autocomplete-dropdown.component';
import {UserGender} from '../../../../models/user/user-gender';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {namePropertyLabel} from '../../../../utils/label-util';
import {find} from 'lodash';

@Component({
  selector: 'user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  private namePropertyLabel: Function = namePropertyLabel;

  @Input() private user: User;

  @ViewChild('genderDropdown')
  private genderDropdown: AutocompleteDropdownComponent;
  private genders: UserGender[];

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
    this.loadData();
    this.initForm();
  }

  loadData() {
    this.genders = [new UserGender({id: 'male', name: 'Male'}), new UserGender({id: 'female', name: 'Female'}), new UserGender({id: 'other', name: 'Other'})];
    /*this.userProxy.getGenders().then((genders) => {
      this.genders = genders;
    });*/
  }

  private initForm() {
    this.settingsForm = this.formBuilder.group({
      'first_name': [this.user.firstName, Validators.compose([Validators.required, Validators.minLength(2)])],
      'last_name': [this.user.lastName, Validators.compose([Validators.required, Validators.minLength(2)])],
      'gender': [this.user.gender, Validators.compose([Validators.required])],
      'email': [this.user.email, Validators.compose([Validators.required, Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)])],
      'phone': [this.user.phone, Validators.compose([Validators.required])],
      'street': [this.user.street],
      'zip': [this.user.zip],
      'city': [this.user.city],
      'account_clearing_number': [this.user.accountClearingNumber],
      'account_number': [this.user.accountNumber]
    });

    // This check is needed since some Users may have been created before Gender was needed
    if(this.user.gender) {
      const genderName = find(this.genders, {id: this.user.gender}).name;
      const genderDropdown = this.genderDropdown;
      const genders = this.genders;
      setTimeout(function() {
        genderDropdown.textInput = genderName;
      }, 100);
    }

    this.passwordForm = this.formBuilder.group({
      'password': [null, Validators.compose([Validators.minLength(6)])],
      'old_password': [null],
      'repeat_password': [null]
    });
  }

  private onGenderSelect(gender) {
    if (gender) {
      this.settingsForm.value.gender = gender.id;
      this.settingsForm.controls['gender'].setValue(gender.id);
    }
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
