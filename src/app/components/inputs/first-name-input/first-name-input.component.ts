import {ApiErrors} from '../../../models/api-errors';
import {Component} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Input} from '@angular/core';

@Component({
  selector: 'first-name-input',
  template: `
    <text-input
      [apiErrors]="apiErrors"
      [control]="control"
      [label]="'input.first.name.label' | translate"
      [placeholder]="'input.first.name.placeholder' | translate"
      apiAttribute="first_name"
      icon="user"
      type="text">
    </text-input>`
})
export class FirstNameInputComponent {
  @Input() apiErrors: ApiErrors;
  @Input() control: FormControl;
}
