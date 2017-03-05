import {ApiErrors} from '../../../../models/api-errors';
import {Component} from '@angular/core';
import {Input} from '@angular/core';

@Component({
  selector: 'text-input',
  template: `
  <div class="field">
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
      [apiAttribute]="apiAttribute"
      [patternLabel]="patternLabel"
      [requiredLabel]="requiredLabel"
      [minLengthLabel]="minLengthLabel"
      [maxLengthLabel]="maxLengthLabel">
    </input-errors>
  </div>
  `
})
export class TextInputComponent {
  @Input() public apiErrors: any;
  @Input() public control: any;
  @Input() public label: any;
  @Input() public placeholder: any;
  @Input() public icon: string;
  @Input() public type: string = 'text';
  @Input() public apiAttribute: string;
  @Input() public patternLabel: string;
  @Input() public requiredLabel: string;
  @Input() public minLengthLabel: string;
  @Input() public maxLengthLabel: string;
}
