import {ApiErrors} from '../../../models/api-errors';
import {Component} from '@angular/core';
import {Input} from '@angular/core';

@Component({
  selector: 'textarea-input',
  template: `
    <textarea
      [formControl]="control"
      [id]="apiAttribute"
      [label]="label"
      [maxlength]="maxlength"
      [name]="apiAttribute"
      [placeholder]="placeholder"
      autosize type="text"
      class="form-control material-input">
    </textarea>
    <input-errors
      [apiAttribute]="apiAttribute"
      [apiErrors]="apiErrors"
      [control]="control">
    </input-errors>`
})
export class TextareaInputComponent {
  @Input() public apiAttribute: string;
  @Input() public apiErrors: any;
  @Input() public control: any;
  @Input() public label: string;
  @Input() public maxlength: number = 200000;
  @Input() public placeholder: string;
}
