import {BaseComponent} from '../../base.component';
import {Component} from '@angular/core';
import {EventEmitter} from '@angular/core';
import {Input} from '@angular/core';
import {MissingUserTraits} from '../../../models/api-models/missing-user-traits/missing-user-traits';
import {Output} from '@angular/core';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
import {UserResolver} from '../../../resolvers/user/user.resolver';
import {UserUpdateFormComponent} from '../../forms/user-update-form/user-update-form.component';
import {ViewChild} from '@angular/core';

@Component({
  selector: 'missing-payment-information-modal',
  template: `
    <basic-modal
      #modal
      [title]="'missing.payment.information.modal.title' | translate"
      icon="massive pink money">
      <modal-content>
        <div class="ui centered grid">
          <div class="sixteen wide phone twelve wide tablet twelve wide computer column">
            <user-update-form
              #userUpdateForm
              [isInModal]="true"
              [missingUserTraits]="missingUserTraits">
            </user-update-form>
          </div>
        </div>
      </modal-content>
      <modal-actions>
        <div class="ui center aligned basic segment button-container">
          <basic-loader
            [complete]="!userUpdateForm.loadingSubmit"
            class="inverted">
          </basic-loader>
          <base-action-button
            (click)="buttonClicked()"
            [buttonText]="'missing.payment.information.modal.button' | translate"
            buttonType="submit"
            kind="primary"
            size="medium">
          </base-action-button>
        </div>
      </modal-actions>
    </basic-modal>`
})
export class MissingPaymentInformationModalComponent extends BaseComponent {
  @Input() public missingUserTraits = null as MissingUserTraits;
  @Output() public onInformationSupplied = new EventEmitter();
  @ViewChild('modal') public modal: any;
  @ViewChild('userUpdateForm') public userUpdateForm: UserUpdateFormComponent;

  public constructor(
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

  public buttonClicked(): void {
    this.userUpdateForm.submitForm()
    .then(() => {
      this.onInformationSupplied.emit();
      this.hide();
    })
    .catch(() => {
      // Handling done in form.
    });
  }
}
