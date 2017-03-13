import {ApiErrors} from '../../../models/api-errors';
import {Component} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Input} from '@angular/core';

@Component({
  selector: 'message-input',
  template: `
  <textarea-input
    [apiErrors]="apiErrors"
    [control]="control"
    [label]="'input.message.label' | translate"
    [placeholder]="'input.message.placeholder' | translate"
    [rows]="10"
    apiAttribute="body">
  </textarea-input>
  `
})
export class MessageInputComponent {
  @Input() apiErrors: ApiErrors;
  @Input() control: FormControl;
}
