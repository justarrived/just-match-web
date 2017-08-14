import {BaseComponent} from '../../base.component';
import {Component} from '@angular/core';
import {EventEmitter} from '@angular/core';
import {Input} from '@angular/core';
import {LoginFormComponent} from '../../forms/login-form/login-form.component';
import {Output} from '@angular/core';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
import {User} from '../../../models/api-models/user/user';
import {UserResolver} from '../../../resolvers/user/user.resolver';
import {ViewChild} from '@angular/core';

@Component({
  selector: 'already-registered-modal',
  template: `
  <basic-modal
    icon="massive pink warning"
    [title]="'already.registered.modal.title' | translate: {emailOrPhone: emailOrPhone}"
    #alreadyRegisteredModal>
    <modal-content>
      <div class="ui centered grid">
        <div class="sixteen wide mobile twelve wide tablet twelve wide computer column">
          <login-form
            [emailOrPhone]="emailOrPhone"
            [navigateToHome]="navigateToHome"
            [isInModal]="true"
            #loginForm>
          </login-form>
          <info-message
            icon="warning"
            [header]="'already.registered.modal.info' | translate: {emailOrPhone: emailOrPhone}">
          </info-message>
        </div>
      </div>
    </modal-content>
    <modal-actions>
      <div class="ui center aligned basic segment button-container">
        <basic-loader
          [complete]="!loginForm.loadingSubmit"
          class="inverted">
        </basic-loader>
        <base-button
          (click)="buttonClicked()"
          [buttonText]="'already.registered.modal.button' | translate"
          buttonType="submit"
          kind="primary"
          size="medium">
        </base-button>
      </div>
    </modal-actions>
  </basic-modal>`
})
export class AlreadyRegisteredModalComponent extends BaseComponent {
@Input() public canBeShown: boolean;
@Input() public emailOrPhone: string = '';
@Input() public navigateToHome: boolean = true;
@Output() public onLoggedIn: EventEmitter<User> = new EventEmitter<User>();
@ViewChild('loginForm') public loginForm: LoginFormComponent;
@ViewChild('alreadyRegisteredModal') public alreadyRegisteredModal: any;

public constructor(
  protected systemLanguagesResolver: SystemLanguagesResolver,
  protected userResolver: UserResolver,
) {
  super(systemLanguagesResolver, userResolver);
}

public show(): void {
  this.alreadyRegisteredModal.show({
    autofocus: false,
    transition: 'horizontal flip'
  });
}

public hide(): void {
  this.alreadyRegisteredModal.hide();
}

public buttonClicked(): void {
  this.loginForm.submitForm()
  .then(user => {
    this.onLoggedIn.emit(user);
    this.hide();
  })
  .catch(() => {
    // Handling done in form.
  });
}
}
