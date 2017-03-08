import {ApiErrors} from '../../../models/api-errors';
import {Component} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Input} from '@angular/core';

@Component({
  selector: 'terms-input',
  template: `
    <div class="field">
      <div class="ui segment">
        <sm-checkbox
          [control]="control"
          [label]="'input.terms.label' | translate">
        </sm-checkbox>
        <div class="ui center aligned basic segment">
          <a
            href="/assets/terms/160523_2051-2_Terms_and_Conditions_(en).pdf"
            target="_blank">
             PDF EN
          </a>,
          <a
            href="/assets/terms/160520_2051-2_Anvandarvillkor_(sv).pdf"
            target="_blank">
             PDF SV
           </a>
         </div>
      </div>
      <input-errors
        [apiErrors]="apiErrors"
        [control]="control"
        apiAttribute="consent">
      </input-errors>
    </div>`
})
export class TermsInputComponent {
  @Input() apiErrors: ApiErrors;
  @Input() control: FormControl;
}
