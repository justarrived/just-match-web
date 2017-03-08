import {ApiErrors} from '../../../models/api-errors';
import {Component} from '@angular/core';
import {Input} from '@angular/core';

@Component({
  selector: 'textarea-input',
  template: `
    <div class="field">
      <textarea
        [formControl]="control"
        [id]="apiAttribute"
        [label]="label"
        [maxlength]="maxlength"
        [name]="apiAttribute"
        [placeholder]="placeholder"
        autosize
        class="form-control material-input"
        type="text">
      </textarea>
      <input-errors
        [apiAttribute]="apiAttribute"
        [apiErrors]="apiErrors"
        [control]="control">
      </input-errors>
      <ng-content></ng-content>
    </div>`
})
export class TextareaInputComponent {
  @Input() public apiAttribute: string;
  @Input() public apiErrors: any;
  @Input() public control: any;
  @Input() public label: string;
  @Input() public maxlength: number = 200000;
  @Input() public placeholder: string;
}
