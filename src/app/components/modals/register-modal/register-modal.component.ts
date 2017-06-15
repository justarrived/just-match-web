import {BaseComponent} from '../../base.component';
import {Component} from '@angular/core';
import {EventEmitter} from '@angular/core';
import {Input} from '@angular/core';
import {Output} from '@angular/core';
import {RegisterFormComponent} from '../../forms/register-form/register-form.component';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
import {User} from '../../../models/api-models/user/user';
import {UserResolver} from '../../../resolvers/user/user.resolver';
import {ViewChild} from '@angular/core';

@Component({
  selector: 'register-modal',
  template: `
    <base-modal
      icon="massive pink add user"
      [title]="'register.modal.title' | translate"
      #registerModal>
      <modal-content>
        <div class="ui centered grid">
          <div class="sixteen wide mobile twelve wide tablet twelve wide computer column">
            <register-form
              [isInModal]="true"
              [navigateToHome]="navigateToHome"
              #registerForm>
            </register-form>
          </div>
        </div>
      </modal-content>
      <modal-actions>
        <div class="ui center aligned basic segment button-container">
          <basic-loader
            [complete]="!registerForm.loadingSubmit"
            class="inverted">
          </basic-loader>
          <base-button
            (click)="buttonClicked()"
            [buttonText]="'register.modal.button' | translate"
            buttonType="submit"
            kind="primary"
            size="medium">
          </base-button>
        </div>
      </modal-actions>
    </base-modal>`
})
export class RegisterModalComponent extends BaseComponent {
  @Input() public navigateToHome: string;
  @Output() public onRegistered: EventEmitter<User> = new EventEmitter<User>();
  @ViewChild('registerForm') public registerForm: RegisterFormComponent;
  @ViewChild('registerModal') public registerModal: any;

  public constructor(
    protected systemLanguagesResolver: SystemLanguagesResolver,
    protected userResolver: UserResolver,
  ) {
    super(systemLanguagesResolver, userResolver);
  }

  public show(): void {
    this.registerModal.show({
      autofocus: false,
      transition: 'horizontal flip'
    });
  }

  public hide(): void {
    this.registerModal.hide();
  }

  public buttonClicked(): void {
    this.registerForm.submitForm()
    .then(user => {
      this.onRegistered.emit(user);
      this.hide();
    })
    .catch(() => {
      // Handling done in form.
    });
  }
}
