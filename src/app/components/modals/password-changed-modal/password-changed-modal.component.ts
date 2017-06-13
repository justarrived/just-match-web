import {BaseComponent} from '../../base.component';
import {Component} from '@angular/core';
import {ConfirmationModalComponent} from '../confirmation-modal/confirmation-modal.component';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
import {UserResolver} from '../../../resolvers/user/user.resolver';
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
export class PasswordChangedModalComponent extends BaseComponent {
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
