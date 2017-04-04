import {ApiErrors} from '../../../models/api-models/api-errors/api-errors';
import {Component} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Input} from '@angular/core';

@Component({
  selector: 'description-input',
  template: `
  <textarea-input
    [apiErrors]="apiErrors"
    [control]="control"
    [hint]="hint"
    [label]="'input.description.label' | translate"
    [placeholder]="'input.description.placeholder' | translate"
    [rows]="10"
    apiAttribute="description">
  </textarea-input>
  `
})
export class DescriptionInputComponent {
  @Input() public apiErrors: ApiErrors;
  @Input() public control: FormControl;
  @Input() public hint: string;
}
