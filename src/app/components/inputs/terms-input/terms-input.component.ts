import {ApiErrors} from '../../../models/api-models/api-errors/api-errors';
import {Component} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Input} from '@angular/core';

@Component({
  selector: 'terms-input',
  template: `
    <div class="ui segment">
      <div class="ui center aligned basic segment">
        <checkbox-input
          [apiErrors]="apiErrors"
          [control]="control"
          [label]="'input.terms.label' | translate"
          apiAttribute="consent"
          uniqueId="terms-checkbox">
        </checkbox-input>
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
    </div>`
})
export class TermsInputComponent {
  @Input() public apiErrors: ApiErrors;
  @Input() public control: FormControl;
}
