import {ApiErrors} from '../../../models/api-errors';
import {Component} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Input} from '@angular/core';

@Component({
  selector: 'ssn-input',
  template: `
    <text-input
      [apiErrors]="apiErrors"
      [control]="control"
      [label]="'input.ssn.label' | translate"
      [placeholder]="'input.ssn.placeholder' | translate"
      apiAttribute="ssn"
      icon="legal"
      type="text">
    </text-input>`
})
export class SSNInputComponent {
  @Input() apiErrors: ApiErrors;
  @Input() control: FormControl;
}
