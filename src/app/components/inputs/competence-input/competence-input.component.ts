import {ApiErrors} from '../../../models/api-errors';
import {Component} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Input} from '@angular/core';

@Component({
  selector: 'competence-input',
  template: `
  <textarea-input
    [apiErrors]="apiErrors"
    [control]="control"
    [label]="'input.competence.label' | translate"
    [placeholder]="'input.competence.placeholder' | translate"
    [rows]="10"
    apiAttribute="competence_text">
  </textarea-input>
  `
})
export class CompetenceInputComponent {
  @Input() apiErrors: ApiErrors;
  @Input() control: FormControl;
}
