import {ApiErrors} from '../../../models/api-models/api-errors/api-errors';
import {Component} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Input} from '@angular/core';

@Component({
  selector: 'zip-input',
  template: `
    <text-input
      [apiErrors]="apiErrors"
      [control]="control"
      [hint]="hint"
      [label]="'input.zip.label' | translate"
      [placeholder]="'input.zip.placeholder' | translate"
      apiAttribute="zip"
      icon="map"
      type="text">
    </text-input>`
})
export class ZipInputComponent {
  @Input() public apiErrors: ApiErrors;
  @Input() public control: FormControl;
  @Input() public hint: string;
}
