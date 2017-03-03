import {ApiErrors} from '../../../../models/api-errors';
import {Component} from '@angular/core';
import {Input} from '@angular/core';

@Component({
  selector: 'text-input',
  template: `
  <sm-input
    [control]="control"
    [label]="label"
    [placeholder]="placeholder"
    class="left"
    [icon]="icon"
    [type]="type">
  </sm-input>
  <input-errors
    [apiErrors]="apiErrors"
    [control]="control"
    [apiAttribute]="apiAttribute">
  </input-errors>
  `
})
export class TextInputComponent {
  @Input() apiErrors: any;
  @Input() control: any;
  @Input() label: any;
  @Input() placeholder: any;
  @Input() icon: string;
  @Input() type: string;
  @Input() apiAttribute: string;
}
