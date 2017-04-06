import {Component} from '@angular/core';
import {EventEmitter} from '@angular/core';
import {ForgotPasswordFormComponent} from '../../forms/forgot-password-form/forgot-password-form.component';
import {Input} from '@angular/core';
import {Output} from '@angular/core';
import {User} from '../../../models/api-models/user/user';
import {ViewChild} from '@angular/core';

@Component({
  selector: 'forgot-password-modal',
  template: `
    <sm-modal
      icon="massive pink unlock"
      [title]="'forgot.password.modal.title' | translate"
      #forgotPasswordModal>
      <modal-content>
        <div class="ui centered grid">
          <div class="sixteen wide phone twelve wide tablet twelve wide computer column">
            <forgot-password-form
              [isInModal]="true"
              #forgotPasswordForm>
            </forgot-password-form>
          </div>
        </div>
      </modal-content>
      <modal-actions>
        <div class="ui center aligned basic segment button-container">
          <sm-loader
            [complete]="!forgotPasswordForm.loadingSubmit"
            class="inverted">
          </sm-loader>
          <base-button
            (click)="buttonClicked()"
            [buttonText]="'forgot.password.modal.button' | translate"
            buttonType="submit"
            kind="primary"
            size="medium">
          </base-button>
        </div>
      </modal-actions>
    </sm-modal>`
})
export class ForgotPasswordModalComponent {
  @Output() public onPasswordLinkSent: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('forgotPasswordForm') public forgotPasswordForm: ForgotPasswordFormComponent;
  @ViewChild('forgotPasswordModal') public forgotPasswordModal: any;

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
    });
  }
}