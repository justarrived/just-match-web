import {ApiErrors} from '../../../models/api-models/api-errors/api-errors';
import {Component} from '@angular/core';
import {Input} from '@angular/core';
import {InputErrorsComponent} from '../../form-errors/input-errors/input-errors.component';
import {ViewChild} from '@angular/core';

@Component({
  selector: 'text-input',
  template: `
    <div
      [ngClass]="{'error': inputErrors.hasErrors()}"
      class="field">
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
      <input-hint-label [hint]="hint"></input-hint-label>
      <ng-content></ng-content>
    </div>`
})
export class TextInputComponent {
  @Input() public apiAttribute: string;
  @Input() public apiErrors: any;
  @Input() public control: any;
  @Input() public hint: string;
  @Input() public icon: string;
  @Input() public label: string;
  @Input() public maxLengthLabel: string;
  @Input() public minLengthLabel: string;
  @Input() public patternLabel: string;
  @Input() public placeholder: string;
  @Input() public requiredLabel: string;
  @Input() public type: string = 'text';
  @ViewChild(InputErrorsComponent) inputErrors: InputErrorsComponent;
}
