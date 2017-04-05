import {Component} from '@angular/core';
import {EventEmitter} from '@angular/core';
import {Input} from '@angular/core';
import {LoginFormComponent} from '../../forms/login-form/login-form.component';
import {Output} from '@angular/core';
import {User} from '../../../models/api-models/user/user';
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
          <div class="sixteen wide phone twelve wide tablet twelve wide computer column">
            <login-form
              [showSubmitButton]="false"
              [navigateToHomeOnLogin]="false"
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
export class LoginModalComponent {
  @Output() public onLoggedIn: EventEmitter<User> = new EventEmitter<User>();
  @ViewChild('loginForm') public loginForm: LoginFormComponent;
  @ViewChild('loginModal') public loginModal: any;

  public show(): void {
    this.loginModal.show({
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
    });
  }
}
