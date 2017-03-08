import {ApiErrors} from '../../../models/api-errors';
import {Component} from '@angular/core';
import {Input} from '@angular/core';

@Component({
  selector: 'select-dropdown-input',
  template: `
    <div class="field">
      <sm-select
       [control]="control"
       [data]="data"
       [label]="label"
       [placeholder]="placeholder"
       class="fluid search">
        <option
          [value]="item[dataItemValueProoerty]"
          *ngFor="let item of data">
          {{item[dataItemLabelProoerty]}}
        </option>
      </sm-select>
      <input-errors
        [apiAttribute]="apiAttribute"
        [apiErrors]="apiErrors"
        [control]="control"
        [maxLengthLabel]="maxLengthLabel"
        [minLengthLabel]="minLengthLabel"
        [patternLabel]="patternLabel"
        [requiredLabel]="requiredLabel">
      </input-errors>
      <ng-content></ng-content>
    </div>`
})
export class SelectDropdownInputComponent {
  @Input() public apiAttribute: string;
  @Input() public apiErrors: any;
  @Input() public control: any;
  @Input() public data: any[];
  @Input() public dataItemLabelProoerty: string;
  @Input() public dataItemValueProoerty: string;
  @Input() public label: string;
  @Input() public maxLengthLabel: string;
  @Input() public minLengthLabel: string;
  @Input() public patternLabel: string;
  @Input() public placeholder: string;
  @Input() public requiredLabel: string;
}
