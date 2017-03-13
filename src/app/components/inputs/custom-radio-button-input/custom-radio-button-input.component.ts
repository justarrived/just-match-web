import {ApiErrors} from '../../../models/api-errors';
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
        {{label}}
      </label>
    </div>`
})
export class CustomRadioButtonInputComponent {
  @Input() public control: any;
  @Input() public label: string;
  @Input() public name: string;
  @Input() public value: string;
}
