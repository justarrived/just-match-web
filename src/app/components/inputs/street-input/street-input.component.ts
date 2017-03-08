import {ApiErrors} from '../../../models/api-errors';
import {Component} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Input} from '@angular/core';

@Component({
  selector: 'street-input',
  template: `
    <text-input
      [apiErrors]="apiErrors"
      [control]="control"
      [label]="'input.street.label' | translate"
      [placeholder]="'input.street.placeholder' | translate"
      apiAttribute="street"
      icon="map pin"
      type="text">
    </text-input>`
})
export class StreetInputComponent {
  @Input() public apiErrors: ApiErrors;
  @Input() public control: FormControl;
}
