import {ApiErrors} from '../../../../models/api-errors';
import {Component} from '@angular/core';
import {Input} from '@angular/core';

@Component({
  selector: 'textarea-input',
  template: `
<label>{{label}}</label>
<textarea
  class="form-control material-input"
  [maxlength]="maxlength"
  [id]="apiAttribute"
  [name]="apiAttribute"
  autosize type="text"
  [placeholder]="placeholder"
  [formControl]="control">
</textarea>
<input-errors
  [apiAttribute]="apiAttribute"
  [control]="control"
  [apiErrors]="apiErrors">
</input-errors>
`,
styles: ['label { color: black; font-size: 20px; }']
})
export class TextareaInputComponent {
  @Input() public maxlength: number = 200000;

  @Input() public apiAttribute: string;
  @Input() public apiErrors: any;
  @Input() public control: any;

  @Input() public label: string;
  @Input() public placeholder: string;
}
