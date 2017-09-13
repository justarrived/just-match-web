import {BaseComponent} from '../../base.component';
import {Component} from '@angular/core';
import {ModalService} from '../../../services/modal.service';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
import {UserResolver} from '../../../resolvers/user/user.resolver';
import {ViewChild} from '@angular/core';
import {EventEmitter} from '@angular/core';
import {Output} from '@angular/core';

@Component({
  selector: 'login-or-register-modal',
  template: `
    <basic-modal
      #modal>
      <modal-content>
        <basic-title-text
          [text]="'login.or.register.modal.title' | translate"
          [underlineBelow]="true"
          color="black"
          fontSize="large"
          marginTop="0"
          textAlignmentLtr="center"
          textAlignmentRtl="center"
          underlineBelowColor="pink"
          underlineBelowLtrAlignment="center"
          underlineBelowRtlAlignment="center">
        </basic-title-text>
      </modal-content>
      <modal-actions>
        <div style="display: flex; align-items: center; justify-content: center; flex-wrap: wrap;">
          <div style="width: 200px; padding: 0 10px;">
            <base-action-button
              (click)="onLoginButtonClick()"
              [buttonText]="'login.or.register.modal.login' | translate"
              [fluid]="true"
              kind="primary"
              size="small">
            </base-action-button>
          </div>
          <div style="width: 200px; padding: 0 10px;">
            <base-action-button
              (click)="onRegisterButtonClick()"
              [buttonText]="'login.or.register.modal.register' | translate"
              [fluid]="true"
              kind="primary"
              size="small">
            </base-action-button>
          </div>
        </div>
      </modal-actions>
    </basic-modal>`
})
export class LoginOrRegisterModalComponent extends BaseComponent {
  @Output() public onLoggedInOrRegistered = new EventEmitter();
  @ViewChild('modal') public modal: any;

  public constructor(
    private modalService: ModalService,
    protected systemLanguagesResolver: SystemLanguagesResolver,
    protected userResolver: UserResolver,
  ) {
    super(systemLanguagesResolver, userResolver);
  }

  public show(): void {
    this.modal.show({
      autofocus: false,
      transition: 'horizontal flip'
    });
  }

  public hide(): void {
    this.modal.hide();
  }

  public onRegisterButtonClick(): void {
    this.modal.hide();
    this.modalService.showModal('registerModalComponent', false, false, 400)
    .then(user => this.onLoggedInOrRegistered.emit(user));
  }

  public onLoginButtonClick(): void {
    this.modal.hide();
    this.modalService.showModal('loginModalComponent', false, false, 400)
    .then(user => this.onLoggedInOrRegistered.emit(user));
  }
}
