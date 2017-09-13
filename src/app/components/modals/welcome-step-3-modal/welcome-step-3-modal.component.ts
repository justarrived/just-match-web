import {BaseComponent} from '../../base.component';
import {Component} from '@angular/core';
import {Input} from '@angular/core';
import {ModalService} from '../../../services/modal.service';
import {NavigationService} from '../../../services/navigation.service';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
import {UserResolver} from '../../../resolvers/user/user.resolver';
import {ViewChild} from '@angular/core';

@Component({
  selector: 'welcome-step-3-modal',
  template: `
    <step-modal
      #modal
      previousModal="welcomeStep2ModalComponent">
      <modal-header>

      </modal-header>
      <modal-content>
        <basic-title-text
          [text]="'welcome-step-3-modal-title' | translate"
          color="black"
          fontSize="huge"
          marginTop="0"
          marginBottom="50px"
          textAlignmentLtr="center"
          textAlignmentRtl="center">
        </basic-title-text>
        <basic-text
          [text]="'welcome-step-3-modal-description' | translate"
          color="gray"
          marginBottom="30px">
        </basic-text>
        <div style="width: 100%; display: flex; flex-wrap: wrap; justify-content: center; padding-top: 30px;">
          <base-action-button
            (click)="goToJobs()"
            [buttonText]="'welcome-step-3-modal-find-jobs-button' | translate"
            [fluid]="true"
            kind="secondary"
            size="small"
            style="width: 160px; margin: 0 10px;">
          </base-action-button>
          <base-action-button
            (click)="updateProfile()"
            [buttonText]="'welcome-step-3-modal-update-profile-button' | translate"
            [fluid]="true"
            kind="primary"
            size="small"
            style="width: 160px; margin: 0 10px;">
          </base-action-button>
        </div>
      </modal-content>
    </step-modal>`
})
export class WelcomeStep3ModalComponent extends BaseComponent {
  @ViewChild('modal') public modal: any;

  public constructor(
    private modalService: ModalService,
    private navigationService: NavigationService,
    protected systemLanguagesResolver: SystemLanguagesResolver,
    protected userResolver: UserResolver,
  ) {
    super(systemLanguagesResolver, userResolver);
  }

  public show(): void {
    this.modal.show();
  }

  public hide(): void {
    this.modal.hide();
  }

  public goToJobs(): void {
    this.navigationService.navigate(this.JARoutes.jobs);
    this.hide();
  }

  public updateProfile(): void {
    this.modalService.showModal('updateProfileStep1ModalComponent', false, false, 400);
  }
}
