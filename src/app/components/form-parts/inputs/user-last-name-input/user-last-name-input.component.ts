import {ApiErrors} from '../../../../models/api-errors';
import {Component} from '@angular/core';
import {Input} from '@angular/core';


@Component({
  selector: 'user-last-name-input',
  template: `
  <text-input
    [apiErrors]="apiErrors"
    [control]="control"
    [label]="('form.parts.user.last.name.input.label' | translate) + ' *'"
    [placeholder]="'form.parts.user.last.name.input.placeholder' | translate"
    apiAttribute="last_name"
    icon="user"
    type="text">
  </text-input>
  `
})
export class UserLastNameInputComponent {
  @Input() apiErrors: any;
  @Input() control: any;
}
