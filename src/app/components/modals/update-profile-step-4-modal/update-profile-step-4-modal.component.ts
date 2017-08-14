import {BaseComponent} from '../../base.component';
import {Component} from '@angular/core';
import {Input} from '@angular/core';
import {NavigationService} from '../../../services/navigation.service';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
import {UserResolver} from '../../../resolvers/user/user.resolver';
import {ViewChild} from '@angular/core';

@Component({
  selector: 'update-profile-step-4-modal',
  template: `
    <stepper-modal
      #modal>
      <modal-header>
        <basic-title-text
          [text]="'update-profile-step-4-modal-header' | translate"
          color="white"
          fontSize="huge"
          marginTop="0"
          marginBottom="0"
          textAlignmentLtr="center"
          textAlignmentRtl="center">
        </basic-title-text>
      </modal-header>
      <modal-content>
        <basic-title-text
          [text]="'update-profile-step-4-modal-description' | translate"
          color="black"
          fontSize="medium"
          marginTop="50px"
          textAlignmentLtr="center"
          textAlignmentRtl="center">
        </basic-title-text>
        <basic-text
          [text]="'update-profile-step-4-modal-sub-description' | translate"
          color="black"
          fontSize="medium"
          textAlignmentLtr="center"
          textAlignmentRtl="center">
        </basic-text>
        <div style="width: 100%; display: flex; flex-wrap: wrap; justify-content: center; padding-top: 30px;">
          <base-button
            (click)="goToJobs()"
            [buttonText]="'update-profile-step-4-modal-find-jobs-button' | translate"
            [fluid]="true"
            kind="primary"
            size="small"
            style="width: 160px; margin: 0 10px;">
          </base-button>
          <base-button
            (click)="goToProfile()"
            [buttonText]="'update-profile-step-4-modal-profile-button' | translate"
            [fluid]="true"
            kind="primary"
            size="small"
            style="width: 160px; margin: 0 10px;">
          </base-button>
        </div>
      </modal-content>
    </stepper-modal>`
})
export class UpdateProfileStep4ModalComponent extends BaseComponent {
  @ViewChild('modal') public modal: any;

  public constructor(
    private navigationService: NavigationService,
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

  public goToJobs(): void {
    this.navigationService.navigate(this.JARoutes.jobs);
    this.hide();
  }

  public goToProfile(): void {
    this.navigationService.navigate(this.JARoutes.user);
    this.hide();
  }
}
