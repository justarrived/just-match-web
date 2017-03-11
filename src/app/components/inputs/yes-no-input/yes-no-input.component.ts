import {ApiErrors} from '../../../models/api-errors';
import {Component} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Input} from '@angular/core';
import {InputErrorsComponent} from '../../form-errors/input-errors/input-errors.component';
import {ViewChild} from '@angular/core';

@Component({
  selector: 'yes-no-input',
  template: `
    <div
      [ngClass]="{'error': inputErrors.hasErrors()}"
      class="field">
      <label
        *ngIf="label"
        style="margin-bottom: 20px">
        {{label}}
      </label>
      <custom-radio-button-input
        [control]="control"
        [label]="'common.yes' | translate"
        [name]="name"
        value="yes">
      </custom-radio-button-input>
      <custom-radio-button-input
        [control]="control"
        [label]="'common.no' | translate"
        [name]="name"
        value="no">
      </custom-radio-button-input>
      <input-errors
        [apiAttribute]="apiAttribute"
        [apiErrors]="apiErrors"
        [control]="control"
        [requiredLabel]="requiredLabel">
      </input-errors>
    </div>`
})
export class YesNoInputComponent {
  @Input() public apiAttribute: string;
  @Input() public apiErrors: ApiErrors;
  @Input() public control: FormControl;
  @Input() public label: string;
  @Input() public name: string;
  @Input() public requiredLabel: string;
  @ViewChild(InputErrorsComponent) inputErrors: InputErrorsComponent;
}
