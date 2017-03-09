import {ApiErrors} from '../../../models/api-errors';
import {Component} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Input} from '@angular/core';

@Component({
  selector: 'description-input',
  template: `
  <textarea-input
    [apiErrors]="apiErrors"
    [control]="control"
    [label]="'input.description.label' | translate"
    [placeholder]="'input.description.placeholder' | translate"
    [rows]="10"
    apiAttribute="description">
  </textarea-input>
  `
})
export class DescriptionInputComponent {
  @Input() apiErrors: ApiErrors;
  @Input() control: FormControl;
}
