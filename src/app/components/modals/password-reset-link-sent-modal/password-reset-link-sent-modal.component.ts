import {ApiErrors} from '../../../models/api-models/api-errors/api-errors';
import {Component} from '@angular/core';
import {ConfirmationModalComponent} from '../confirmation-modal/confirmation-modal.component';
import {Input} from '@angular/core';
import {ViewChild} from '@angular/core';

@Component({
  selector: 'password-reset-link-sent-modal',
  template: `
    <confirmation-modal
      [description]="'confirmation.password.reset.link.description' | translate"
      [header]="'confirmation.password.reset.link.title' | translate"
      icon="massive pink envelope"
      #confirmationModal>
    </confirmation-modal>`
})
export class PasswordResetLinkSentModalComponent {
  @ViewChild('confirmationModal') public confirmationModal: ConfirmationModalComponent;

  public show() {
    this.confirmationModal.show();
  }

  public hide() {
    this.confirmationModal.show();
  }
}