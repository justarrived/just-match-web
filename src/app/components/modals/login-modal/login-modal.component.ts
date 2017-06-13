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
  selector: 'login-modal',
  template: `
    <sm-modal
      icon="massive pink lock"
      [title]="'login.modal.title' | translate"
      #loginModal>
      <modal-content>
        <div class="ui centered grid">
          <div class="sixteen wide mobile twelve wide tablet twelve wide computer column">
            <login-form
              [isInModal]="true"
              [navigateToHome]="navigateToHome"
              #loginForm>
            </login-form>
          </div>
        </div>
      </modal-content>
      <modal-actions>
        <div class="ui center aligned basic segment button-container">
          <sm-loader
            [complete]="!loginForm.loadingSubmit"
            class="inverted">
          </sm-loader>
          <base-button
            (click)="buttonClicked()"
            [buttonText]="'login.modal.button' | translate"
            buttonType="submit"
            kind="primary"
            size="medium">
          </base-button>
        </div>
      </modal-actions>
    </sm-modal>`
})
export class LoginModalComponent extends BaseComponent {
  @Input() public navigateToHome: boolean = true;
  @Output() public onLoggedIn: EventEmitter<User> = new EventEmitter<User>();
  @ViewChild('loginForm') public loginForm: LoginFormComponent;
  @ViewChild('loginModal') public loginModal: any;

  public constructor(
    protected systemLanguagesResolver: SystemLanguagesResolver,
    protected userResolver: UserResolver,
  ) {
    super(systemLanguagesResolver, userResolver);
  }

  public show(): void {
    this.loginModal.show({
      autofocus: false,
      transition: 'horizontal flip'
    });
  }

  public hide(): void {
    this.loginModal.hide();
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
