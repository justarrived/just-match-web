import {ApiErrors} from '../../../models/api-models/api-errors/api-errors';
import {Component} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Input} from '@angular/core';

@Component({
  selector: 'got-coordination-number-input',
  template: `
    <yes-no-input
      [apiErrors]="apiErrors"
      [control]="control"
      [hint]="hint"
      [label]="'input.got.coordination.number.label' | translate"
      apiAttribute="got_coordination_number"
      name="got_coordination_number">
    </yes-no-input>`
})
export class GotCoordinationNumberInputComponent {
  @Input() public apiErrors: ApiErrors;
  @Input() public control: FormControl;
  @Input() public hint: string;
}
