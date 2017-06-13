import {BaseComponent} from '../../base.component';
import {Component} from '@angular/core';
import {ConfirmationModalComponent} from '../confirmation-modal/confirmation-modal.component';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
import {UserResolver} from '../../../resolvers/user/user.resolver';
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
export class ContactMessageSentModalComponent extends BaseComponent {
  @ViewChild('confirmationModal') public confirmationModal: ConfirmationModalComponent;

  public constructor(
    protected systemLanguagesResolver: SystemLanguagesResolver,
    protected userResolver: UserResolver,
  ) {
    super(systemLanguagesResolver, userResolver);
  }

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
