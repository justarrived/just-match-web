import {BaseComponent} from '../../base.component';
import {Component} from '@angular/core';
import {Input} from '@angular/core';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
import {UserResolver} from '../../../resolvers/user/user.resolver';
import {ViewChild} from '@angular/core';

@Component({
  selector: 'update-profile-step-3-modal',
  template: `
    <stepper-modal
      #modal
      previousModal="updateProfileStep2ModalComponent"
      nextModal="updateProfileStep4ModalComponent">
      <modal-header>
        <basic-title-text
          [text]="'update-profile-step-3-modal-header' | translate"
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
          [currentStep]="3"
          [steps]="[1,2,3]">
        </basic-stepper>
        <basic-title-text
          [text]="'update-profile-step-3-modal-description' | translate"
          color="black"
          fontSize="medium"
          marginTop="0"
          marginBottom="20px"
          textAlignmentLtr="center"
          textAlignmentRtl="center">
        </basic-title-text>
        <profile-image-input
          [centered]="true"
          size="small">
        </profile-image-input>
      </modal-content>
    </stepper-modal>`
})
export class UpdateProfileStep3ModalComponent extends BaseComponent {
  @ViewChild('modal') public modal: any;

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
}
