import {Component} from '@angular/core';
import {EventEmitter} from '@angular/core';
import {Input} from '@angular/core';
import {RegisterFormComponent} from '../../forms/register-form/register-form.component';
import {Output} from '@angular/core';
import {User} from '../../../models/api-models/user/user';
import {ViewChild} from '@angular/core';

@Component({
  selector: 'register-modal',
  template: `
    <sm-modal
      icon="massive pink add user"
      [title]="'register.modal.title' | translate"
      #registerModal>
      <modal-content>
        <div class="ui centered grid">
          <div class="sixteen wide phone twelve wide tablet twelve wide computer column">
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
          <sm-loader
            [complete]="!registerForm.loadingSubmit"
            class="inverted">
          </sm-loader>
          <base-button
            (click)="buttonClicked()"
            [buttonText]="'register.modal.button' | translate"
            buttonType="submit"
            kind="primary"
            size="medium">
          </base-button>
        </div>
      </modal-actions>
    </sm-modal>`
})
export class RegisterModalComponent {
  @Input() public navigateToHome: string;
  @Output() public onRegistered: EventEmitter<User> = new EventEmitter<User>();
  @ViewChild('registerForm') public registerForm: RegisterFormComponent;
  @ViewChild('registerModal') public registerModal: any;

  public show(): void {
    this.registerModal.show({
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
    });
  }
}
