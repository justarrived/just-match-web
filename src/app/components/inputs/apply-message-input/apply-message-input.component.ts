import {ApiErrors} from '../../../models/api-models/api-errors/api-errors';
import {Component} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Input} from '@angular/core';

@Component({
  selector: 'apply-message-input',
  template: `
    <textarea-input
      [apiErrors]="apiErrors"
      [control]="control"
      [hint]="hint"
      [label]="'input.apply.message.label' | translate"
      [placeholder]="'input.apply.message.placeholder' | translate"
      [rows]="10"
      apiAttribute="apply_message">
    </textarea-input>
  `
})
export class ApplyMessageInputComponent {
  @Input() public apiErrors: ApiErrors;
  @Input() public control: FormControl;
  @Input() public hint: string;
}
