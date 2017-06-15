import {BaseComponent} from '../../base.component';
import {Component} from '@angular/core';
import {EventEmitter} from '@angular/core';
import {ForgotPasswordFormComponent} from '../../forms/forgot-password-form/forgot-password-form.component';
import {Input} from '@angular/core';
import {Output} from '@angular/core';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
import {User} from '../../../models/api-models/user/user';
import {UserResolver} from '../../../resolvers/user/user.resolver';
import {ViewChild} from '@angular/core';

@Component({
  selector: 'forgot-password-modal',
  template: `
    <base-modal
      icon="massive pink unlock"
      [title]="'forgot.password.modal.title' | translate"
      #forgotPasswordModal>
      <modal-content>
        <div class="ui centered grid">
          <div class="sixteen wide mobile twelve wide tablet twelve wide computer column">
            <forgot-password-form
              [isInModal]="true"
              #forgotPasswordForm>
            </forgot-password-form>
          </div>
        </div>
      </modal-content>
      <modal-actions>
        <div class="ui center aligned basic segment button-container">
          <basic-loader
            [complete]="!forgotPasswordForm.loadingSubmit"
            class="inverted">
          </basic-loader>
          <base-button
            (click)="buttonClicked()"
            [buttonText]="'forgot.password.modal.button' | translate"
            buttonType="submit"
            kind="primary"
            size="medium">
          </base-button>
        </div>
      </modal-actions>
    </base-modal>`
})
export class ForgotPasswordModalComponent extends BaseComponent {
  @Output() public onPasswordLinkSent: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('forgotPasswordForm') public forgotPasswordForm: ForgotPasswordFormComponent;
  @ViewChild('forgotPasswordModal') public forgotPasswordModal: any;

  public constructor(
    protected systemLanguagesResolver: SystemLanguagesResolver,
    protected userResolver: UserResolver,
  ) {
    super(systemLanguagesResolver, userResolver);
  }

  public show(): void {
    this.forgotPasswordModal.show({
      autofocus: false,
      transition: 'horizontal flip'
    });
  }

  public hide(): void {
    this.forgotPasswordModal.hide();
  }

  public buttonClicked(): void {
    this.forgotPasswordForm.submitForm()
    .then(user => {
      this.onPasswordLinkSent.emit();
      this.hide();
    })
    .catch(() => {
      // Handling done in form.
    });
  }
}
