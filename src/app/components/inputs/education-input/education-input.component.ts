import {ApiErrors} from '../../../models/api-models/api-errors/api-errors';
import {Component} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Input} from '@angular/core';

@Component({
  selector: 'education-input',
  template: `
  <textarea-input
    [apiErrors]="apiErrors"
    [control]="control"
    [hint]="hint"
    [label]="'input.education.label' | translate"
    [placeholder]="'input.education.placeholder' | translate"
    [rows]="10"
    apiAttribute="education">
  </textarea-input>
  `
})
export class EducationInputComponent {
  @Input() public apiErrors: ApiErrors;
  @Input() public control: FormControl;
  @Input() public hint: string;
}
