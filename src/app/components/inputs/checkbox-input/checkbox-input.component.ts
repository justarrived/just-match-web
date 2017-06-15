import {ApiErrors} from '../../../models/api-models/api-errors/api-errors';
import {Component} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Input} from '@angular/core';
import {InputErrorsComponent} from '../../form-errors/input-errors/input-errors.component';
import {ViewChild} from '@angular/core';

@Component({
  selector: "checkbox-input",
  template: `
    <div
      [ngClass]="{'error': inputErrors.hasErrors()}"
      class="field">
      <div class="ui checkbox">
        <input
          [formControl]="control"
          [id]="uniqueId"
          type="checkbox">
        <label
          [for]="uniqueId"
          *ngIf="label"
          style="cursor: pointer;">
          <basic-text
            [text]="label"
            *ngIf="label"
            marginBottom="0"
            marginTop="0">
          </basic-text>
        </label>
      </div>
      <input-errors
        [apiAttribute]="apiAttribute"
        [apiErrors]="apiErrors"
        [control]="control"
        [requiredLabel]="requiredLabel">
      </input-errors>
    </div>`
})
export class CheckboxInputComponent {
  @Input() public apiAttribute: string;
  @Input() public apiErrors: ApiErrors;
  @Input() public control: FormControl;
  @Input() public label: string;
  @Input() public requiredLabel: string;
  @Input() public uniqueId: string;
  @ViewChild(InputErrorsComponent) inputErrors: InputErrorsComponent;
}
