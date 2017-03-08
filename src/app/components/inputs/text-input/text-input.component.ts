import {ApiErrors} from '../../../models/api-errors';
import {Component} from '@angular/core';
import {Input} from '@angular/core';

@Component({
  selector: 'text-input',
  template: `
  <div class="field">
    <sm-input
      [control]="control"
      [icon]="icon"
      [label]="label"
      [placeholder]="placeholder"
      [type]="type"
      class="left">
    </sm-input>
    <input-errors
      [apiAttribute]="apiAttribute"
      [apiErrors]="apiErrors"
      [control]="control"
      [maxLengthLabel]="maxLengthLabel"
      [minLengthLabel]="minLengthLabel"
      [patternLabel]="patternLabel"
      [requiredLabel]="requiredLabel">
    </input-errors>
  </div>
  `
})
export class TextInputComponent {
  @Input() public apiAttribute: string;
  @Input() public apiErrors: any;
  @Input() public control: any;
  @Input() public icon: string;
  @Input() public label: any;
  @Input() public maxLengthLabel: string;
  @Input() public minLengthLabel: string;
  @Input() public patternLabel: string;
  @Input() public placeholder: any;
  @Input() public requiredLabel: string;
  @Input() public type: string = 'text';
}
