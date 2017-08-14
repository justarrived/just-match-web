import {BaseComponent} from '../../base.component';
import {Component} from '@angular/core';
import {Input} from '@angular/core';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
import {UserResolver} from '../../../resolvers/user/user.resolver';
import {UserUpdateFormComponent} from '../../forms/user-update-form/user-update-form.component';
import {ViewChild} from '@angular/core';

@Component({
  selector: 'update-profile-step-1-modal',
  template: `
    <stepper-modal
      #modal
      [goToNextOnClick]="false"
      (onNextClick)="nextClicked()"
      nextModal="updateProfileStep2ModalComponent">
      <modal-header>
        <basic-title-text
          [text]="'update-profile-step-1-modal-header' | translate"
          color="white"
          fontSize="huge"
          marginTop="0"
          marginBottom="0"
          textAlignmentLtr="center"
          textAlignmentRtl="center">
        </basic-title-text>
      </modal-header>
      <modal-content>
        <basic-stepper
          [currentStep]="1"
          [steps]="[1,2,3]">
        </basic-stepper>
        <user-update-form
          #userUpdateForm
          [isInModal]="true"
          [missingUserTraits]="{skill_ids: {}}">
        </user-update-form>
      </modal-content>
    </stepper-modal>`
})
export class UpdateProfileStep1ModalComponent extends BaseComponent {
  @ViewChild('modal') public modal: any;
  @ViewChild('userUpdateForm') public userUpdateForm: UserUpdateFormComponent;

  public constructor(
    protected systemLanguagesResolver: SystemLanguagesResolver,
    protected userResolver: UserResolver,
  ) {
    super(systemLanguagesResolver, userResolver);
  }

  public show() {
    this.modal.show();
  }

  public hide() {
    this.modal.hide();
  }

  public nextClicked(): void {
    this.userUpdateForm.submitForm()
    .then(() => {
      this.modal.next(false);
    })
    .catch(() => {
      // Handling done in form.
    });
  }
}
