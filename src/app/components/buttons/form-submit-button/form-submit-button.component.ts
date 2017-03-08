import {ApiErrors} from '../../../models/api-errors';
import {Component} from '@angular/core';
import {Input} from '@angular/core';

@Component({
  selector: 'form-submit-button',
  template: `
    <div class="ui basic center aligned segment">
      <error-message
        *ngIf="submitFail"
        [header]="'button.form.submit.fail' | translate"
        icon="warning">
      </error-message>
      <success-message
        *ngIf="submitSuccess"
        [header]="'button.form.submit.success' | translate"
        icon="smile o">
      </success-message>
      <button
        class="btn-primary btn-small btn"
        type="submit">
        {{buttonText}}
      </button>
      <ng-content></ng-content>
    </div>`
})
export class FormSubmitButtonComponent {
  @Input() submitFail: boolean;
  @Input() submitSuccess: boolean;
  @Input() buttonText: string;
}
