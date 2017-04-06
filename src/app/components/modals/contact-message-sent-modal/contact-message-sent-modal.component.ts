import {Component} from '@angular/core';
import {ConfirmationModalComponent} from '../confirmation-modal/confirmation-modal.component';
import {ViewChild} from '@angular/core';

@Component({
  selector: 'contact-message-sent-modal',
  template: `
    <confirmation-modal
      [description]="'confirmation.contact.description' | translate"
      [header]="'confirmation.contact.title' | translate"
      icon="massive pink envelope"
      #confirmationModal>
    </confirmation-modal>`
})
export class ContactMessageSentModalComponent {
  @ViewChild('confirmationModal') public confirmationModal: ConfirmationModalComponent;

  public show() {
    this.confirmationModal.show({
      autofocus: false,
      transition: 'horizontal flip'
    });
  }

  public hide() {
    this.confirmationModal.hide();
  }
}
