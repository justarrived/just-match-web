import {ApiErrors} from '../../../models/api-errors';
import {Component} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Input} from '@angular/core';

@Component({
  selector: 'at-und-input',
  template: `
    <yes-no-input
      [apiErrors]="apiErrors"
      [control]="control"
      [label]="'input.at.und.label' | translate"
      apiAttribute="at_und"
      name="at_und">
    </yes-no-input>`
})
export class AtUndInputComponent {
  @Input() apiErrors: ApiErrors;
  @Input() control: FormControl;
}
