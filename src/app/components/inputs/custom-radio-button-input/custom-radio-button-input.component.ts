import {ApiErrors} from '../../../models/api-models/api-errors/api-errors';
import {Component} from '@angular/core';
import {Input} from '@angular/core';

@Component({
  selector: 'custom-radio-button-input',
  styleUrls: ['./custom-radio-button-input.component.scss'],
  template: `
    <div class="custom-radio-button-container">
      <label class="custom-radio-button-label">
        <input
          [formControl]="control"
          [name]="name"
          [value]="value"
          class="custom-radio-button-input"
          type="radio"/>
        <span class="custom-radio-button-span"></span>
        <basic-text
          [text]="label"
          fontWeight="light"
          textAlignmentLtr="center"
          textAlignmentRtl="center"
          marginBottom="0"
          marginTop="0">
        </basic-text>
      </label>
    </div>`
})
export class CustomRadioButtonInputComponent {
  @Input() public control: any;
  @Input() public label: string;
  @Input() public name: string;
  @Input() public value: string;
}
