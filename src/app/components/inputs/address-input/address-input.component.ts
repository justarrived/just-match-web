import {ApiErrors} from '../../../models/api-models/api-errors/api-errors';
import {Component} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Input} from '@angular/core';

@Component({
  selector: 'address-input',
  template: `
    <street-input
      [apiErrors]="apiErrors"
      [control]="streetControl">
    </street-input>

    <zip-input
      [apiErrors]="apiErrors"
      [control]="zipControl">
    </zip-input>

    <city-input
      [apiErrors]="apiErrors"
      [control]="cityControl">
    </city-input>`
})
export class AddressInputComponent {
  @Input() apiErrors: ApiErrors;
  @Input() streetControl: FormControl;
  @Input() zipControl: FormControl;
  @Input() cityControl: FormControl;
}
