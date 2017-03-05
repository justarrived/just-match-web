import {ApiErrors} from '../../../../models/api-errors';
import {Component} from '@angular/core';
import {Input} from '@angular/core';

@Component({
  selector: 'user-first-name-input',
  template: `
  <text-input
    [apiErrors]="apiErrors"
    [control]="control"
    [label]="('user.form.first.name.input.label' | translate) + ' *'"
    [placeholder]="'user.form.first.name.input.placeholder' | translate"
    apiAttribute="first_name"
    icon="user"
    type="text">
  </text-input>
  `
})
export class UserFirstNameInputComponent {
  @Input() apiErrors: any;
  @Input() control: any;
}
