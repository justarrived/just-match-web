import {ApiErrors} from '../../../models/api-models/api-errors/api-errors';
import {Component} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Input} from '@angular/core';

@Component({
  selector: 'name-input',
  template: `
    <text-input
      [apiErrors]="apiErrors"
      [control]="control"
      [label]="'input.name.label' | translate"
      [placeholder]="'input.name.placeholder' | translate"
      apiAttribute="name"
      icon="user"
      type="text">
    </text-input>`
})
export class NameInputComponent {
  @Input() apiErrors: ApiErrors;
  @Input() control: FormControl;
}
