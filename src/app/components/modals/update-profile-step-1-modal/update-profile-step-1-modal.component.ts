import {BaseComponent} from '../../base.component';
import {Component} from '@angular/core';
import {Input} from '@angular/core';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
import {UserResolver} from '../../../resolvers/user/user.resolver';
import {ViewChild} from '@angular/core';

@Component({
  selector: 'update-profile-step-1-modal',
  template: `
    <stepper-modal
      #modal
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
        <resume-input
          [centered]="true"
          [showLabel]="false">
        </resume-input>
      </modal-content>
    </stepper-modal>`
})
export class UpdateProfileStep1ModalComponent extends BaseComponent {
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
