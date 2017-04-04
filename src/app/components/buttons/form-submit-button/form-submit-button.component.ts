import {ApiErrors} from '../../../models/api-models/api-errors/api-errors';
import {Component} from '@angular/core';
import {Input} from '@angular/core';

@Component({
  selector: 'form-submit-button',
  template: `
    <error-message
      *ngIf="submitFail"
      [header]="'button.form.submit.fail' | translate"
      icon="warning">
    </error-message>
    <success-message
      *ngIf="submitSuccess && showButton"
      [header]="'button.form.submit.success' | translate"
      icon="pink thumbs up">
    </success-message>
    <div
      [style.padding]="0"
      class="ui basic center aligned segment">
      <base-button
        [buttonText]="buttonText"
        [fluid]="false"
        [icon]="icon"
        *ngIf="showButton"
        buttonType="submit"
        kind="secondary"
        size="medium">
      </base-button>
      <ng-content></ng-content>
    </div>`
})
export class FormSubmitButtonComponent {
  @Input() public buttonText: string;
  @Input() public icon: string;
  @Input() public showButton: boolean = true;
  @Input() public submitFail: boolean;
  @Input() public submitSuccess: boolean;
}
