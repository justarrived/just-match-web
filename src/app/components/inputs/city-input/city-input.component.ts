import {ApiErrors} from '../../../models/api-errors';
import {Component} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Input} from '@angular/core';

@Component({
  selector: 'city-input',
  template: `
    <text-input
      [apiErrors]="apiErrors"
      [control]="control"
      [label]="'input.city.label' | translate"
      [placeholder]="'input.city.placeholder' | translate"
      apiAttribute="city"
      icon="map"
      type="text">
    </text-input>`
})
export class CityInputComponent {
  @Input() apiErrors: ApiErrors;
  @Input() control: FormControl;
}