import {ApiErrors} from '../../../models/api-models/api-errors/api-errors';
import {Component} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Input} from '@angular/core';

@Component({
  selector: 'last-name-input',
  template: `
    <text-input
      [apiErrors]="apiErrors"
      [control]="control"
      [label]="'input.last.name.label' | translate"
      [placeholder]="'input.last.name.placeholder' | translate"
      apiAttribute="last_name"
      icon="user"
      type="text">
    </text-input>`
})
export class LastNameInputComponent {
  @Input() apiErrors: ApiErrors;
  @Input() control: FormControl;
}
