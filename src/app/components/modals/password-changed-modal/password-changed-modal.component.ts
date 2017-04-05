import {Component} from '@angular/core';
import {ConfirmationModalComponent} from '../confirmation-modal/confirmation-modal.component';
import {ViewChild} from '@angular/core';

@Component({
  selector: 'password-changed-modal',
  template: `
    <confirmation-modal
      [description]="'confirmation.password.reset.description' | translate"
      [header]="'confirmation.password.reset.title' | translate"
      icon="massive pink check"
      #confirmationModal>
    </confirmation-modal>`
})
export class PasswordChangedModalComponent {
  @ViewChild('confirmationModal') public confirmationModal: ConfirmationModalComponent;

  public show() {
    this.confirmationModal.show();
  }

  public hide() {
    this.confirmationModal.show();
  }
}
