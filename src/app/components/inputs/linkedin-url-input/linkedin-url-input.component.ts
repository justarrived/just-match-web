import {ApiErrors} from '../../../models/api-models/api-errors/api-errors';
import {Component} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Input} from '@angular/core';

@Component({
  selector: 'linkedin-url-input',
  template: `
    <text-input
      [apiErrors]="apiErrors"
      [control]="control"
      [hint]="hint"
      [label]="'input.linkedin.url.label' | translate"
      [placeholder]="'input.linkedin.url.placeholder' | translate"
      apiAttribute="linkedin_url"
      icon="pink linkedin square"
      type="text">
    </text-input>`
})
export class LinkedinUrlInputComponent {
  @Input() public apiErrors: ApiErrors;
  @Input() public control: FormControl;
  @Input() public hint: string;
}
