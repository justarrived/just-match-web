import {ApiErrors} from '../../../models/api-errors';
import {Component} from '@angular/core';
import {Input} from '@angular/core';

@Component({
  selector: 'user-address-input',
  template: `
  <text-input
    [apiErrors]="apiErrors"
    [control]="streetControl"
    [label]="('user.form.street.header' | translate) + ' *'"
    [placeholder]="'user.form.street.placeholder' | translate"
    apiAttribute="street"
    icon="map pin">
  </text-input>
  <text-input
    [apiErrors]="apiErrors"
    [control]="zipControl"
    [label]="('user.form.zip.header' | translate) + ' *'"
    [placeholder]="'user.form.zip.placeholder' | translate"
    apiAttribute="zip"
    icon="map">
  </text-input>
  <text-input
    [apiErrors]="apiErrors"
    [control]="cityControl"
    [label]="('user.form.city.header' | translate) + ' *'"
    [placeholder]="'user.form.city.placeholder' | translate"
    apiAttribute="city"
    icon="map">
  </text-input>
  `
})
export class UserAddressInputComponent {
  @Input() apiErrors: any;
  @Input() streetControl: any;
  @Input() zipControl: any;
  @Input() cityControl: any;
}
