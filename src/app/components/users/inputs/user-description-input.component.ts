import {ApiErrors} from '../../../models/api-errors';
import {Component} from '@angular/core';
import {Input} from '@angular/core';

@Component({
  selector: 'user-description-input',
  template: `
<textarea-input
  [label]="'user.profile.form.general.description.label' | translate"
  [placeholder]="'user.profile.form.general.description.placeholder' | translate"
  [apiErrors]="apiErrors"
  [control]="control">
</textarea-input>
`,
styles: ['label { color: black; font-size: 20px; }']
})
export class UserDescriptionInputComponent {
  @Input() apiErrors: any;
  @Input() control: any;
}
