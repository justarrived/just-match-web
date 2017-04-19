import {ApiErrors} from '../../../models/api-models/api-errors/api-errors';
import {Component} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Input} from '@angular/core';

@Component({
  selector: 'facebook-url-input',
  template: `
    <text-input
      [apiErrors]="apiErrors"
      [control]="control"
      [hint]="hint"
      [label]="'input.facebook.url.label' | translate"
      [placeholder]="'input.facebook.url.placeholder' | translate"
      apiAttribute="facebook_url"
      icon="pink facebook square"
      type="text">
    </text-input>`
})
export class FacebookUrlInputComponent {
  @Input() public apiErrors: ApiErrors;
  @Input() public control: FormControl;
  @Input() public hint: string;
}
