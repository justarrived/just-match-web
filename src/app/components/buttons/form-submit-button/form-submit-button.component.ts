import {BaseComponent} from '../../base.component';
import {Component} from '@angular/core';
import {Input} from '@angular/core';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
import {UserResolver} from '../../../resolvers/user/user.resolver';

@Component({
  selector: 'form-submit-button',
  template: `
    <div
      *ngIf="submitFail && showErrorMessage"
      style="padding-top: 20px;">
      <error-message
        [header]="'button.form.submit.fail' | translate"
        icon="warning">
      </error-message>
    </div>
    <div
      *ngIf="submitSuccess && showSuccessMessage"
      style="padding-top: 20px;">
      <success-message
        [header]="'button.form.submit.success' | translate"
        icon="pink thumbs up">
      </success-message>
    </div>
    <div
      [style.padding]="0"
      class="ui basic center aligned segment">
      <base-button
        [buttonText]="buttonText"
        [fluid]="false"
        [icon]="icon"
        *ngIf="showButton"
        buttonType="submit"
        [kind]="kind"
        [size]="size">
      </base-button>
      <ng-content></ng-content>
    </div>`
})
export class FormSubmitButtonComponent extends BaseComponent {
  @Input() public buttonText: string;
  @Input() public icon: string;
  @Input() public kind: string = 'secondary';
  @Input() public showButton: boolean = true;
  @Input() public showErrorMessage: boolean = true;
  @Input() public showSuccessMessage: boolean = true;
  @Input() public size: string = 'large';
  @Input() public submitFail: boolean;
  @Input() public submitSuccess: boolean;

  public constructor(
    protected systemLanguagesResolver: SystemLanguagesResolver,
    protected userResolver: UserResolver,
  ) {
    super(systemLanguagesResolver, userResolver);
  }
}
