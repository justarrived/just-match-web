import {Application} from '../../../models/api-models/application/application';
import {ApplicationProxy} from '../../../proxies/application/application.proxy';
import {BaseComponent} from '../../base.component';
import {Component} from '@angular/core';
import {EventEmitter} from '@angular/core';
import {Input} from '@angular/core';
import {Job} from '../../../models/api-models/job/job';
import {Language} from '../../../models/api-models/language/language';
import {MissingUserTraits} from '../../../models/api-models/missing-user-traits/missing-user-traits';
import {MissingUserTraitsProxy} from '../../../proxies/missing-user-traits/missing-user-traits.proxy';
import {ModalService} from '../../../services/modal.service';
import {Output} from '@angular/core';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
import {User} from '../../../models/api-models/user/user';
import {UserResolver} from '../../../resolvers/user/user.resolver';

@Component({
  selector: 'job-actions-section',
  template: `
    <basic-loader
      [promise]="promises"
      class="inverted">
    </basic-loader>
    <div
      *ngIf="!application && job.openForApplications"
      [style.text-align]="center ? 'center' : 'initial'">
      <base-action-button
        (click)="onApplyForJobButtonClick()"
        [buttonText]="'job.actions.section.apply' | translate"
        kind="primary"
        marginTop="0"
        marginBottom="0"
        size="small">
      </base-action-button>
    </div>
    <basic-title-text
      [text]="'job.actions.section.closed.for.applications' | translate"
      *ngIf="!application && !job.openForApplications"
      color="black"
      fontSize="medium"
      [textAlignmentLtr]="center ? 'center' : 'left'"
      [textAlignmentRtl]="center ? 'center' : 'right'"
      marginTop="0"
      marginBottom="0">
    </basic-title-text>
    <basic-title-text
      [text]="'job.actions.section.rejected' | translate"
      *ngIf="application && application.applicationStatus === 'rejected'"
      color="black"
      fontSize="medium"
      [textAlignmentLtr]="center ? 'center' : 'left'"
      [textAlignmentRtl]="center ? 'center' : 'right'"
      marginTop="0"
      marginBottom="0">
    </basic-title-text>
    <basic-title-text
      [text]="'job.actions.section.withdrawn' | translate"
      *ngIf="application && application.applicationStatus === 'withdrawn'"
      color="black"
      fontSize="medium"
      [textAlignmentLtr]="center ? 'center' : 'left'"
      [textAlignmentRtl]="center ? 'center' : 'right'"
      marginTop="0"
      marginBottom="0">
    </basic-title-text>
    <basic-title-text
      [text]="'job.actions.section.applied' | translate"
      *ngIf="application && application.applicationStatus === 'applied'"
      color="black"
      fontSize="medium"
      [textAlignmentLtr]="center ? 'center' : 'left'"
      [textAlignmentRtl]="center ? 'center' : 'right'"
      marginTop="0"
      marginBottom="0">
    </basic-title-text>
    <div *ngIf="application && application.applicationStatus === 'offered'">
      <basic-title-text
        [text]="'job.actions.section.offer' | translate: {hours: application.remainsConfirmationHours, minutes: application.remainsConfirmationMinutes}"
        color="black"
        fontSize="medium"
        marginTop="0"
        marginBottom="0"
        [textAlignmentLtr]="center ? 'center' : 'left'"
        [textAlignmentRtl]="center ? 'center' : 'right'">
      </basic-title-text>
      <div
        [style.text-align]="center ? 'center' : 'initial'">
        <base-action-button
          (click)="onConfirmJobButtonClick()"
          [buttonText]="'job.actions.section.confirm' | translate"
          kind="primary"
          size="small">
        </base-action-button>
      </div>
    </div>
    <basic-title-text
      [text]="'job.actions.section.hired' | translate"
      *ngIf="application && application.applicationStatus === 'hired'"
      color="black"
      fontSize="medium"
      [textAlignmentLtr]="center ? 'center' : 'left'"
      [textAlignmentRtl]="center ? 'center' : 'right'"
      marginTop="0"
      marginBottom="0">
    </basic-title-text>
    <a
      *ngIf="!hideReadMore"
      href="https://justarrived.se/"
      target="_blank"
      rel="noopener">
      <div
        style="display: flex; align-items: center; justify-content: center; margin-top: 20px;"
        [style.margin]="center ? '20px auto 0 auto' : '20px 0 0 0'">
        <basic-title-text
          [text]="'job.actions.section.read.more' | translate"
          color="pink"
          display="inline"
          fontSize="tiny"
          style="margin-right: 5px; margin-left: 5px;">
        </basic-title-text>
        <img
          src="/assets/images/logo.png"
          class="ui tiny image">
      </div>
    </a>`
})
export class JobActionsSectionComponent extends BaseComponent {
  @Input() public application = null as Application;
  @Input() public job = null as Job;
  @Input() public hideReadMore: boolean = false;
  @Input() public center: boolean = true;
  @Output() public applicationChange: EventEmitter<Application> = new EventEmitter<Application>();

  public missingUserTraits: MissingUserTraits;
  public promises: Promise<any>;

  public constructor(
    private applicationProxy: ApplicationProxy,
    private missingUserTraitsProxy: MissingUserTraitsProxy,
    private modalService: ModalService,
    protected systemLanguagesResolver: SystemLanguagesResolver,
    protected userResolver: UserResolver,
  ) {
    super(systemLanguagesResolver, userResolver);
  }

  public onInit(): void {
    this.loadData();
  }

  public systemLanguageChanged(systemLanguage: Language): void {
    this.loadData();
  }

  public userChanged(user: User): void {
    this.loadData();
  }

  protected loadData(): void {
    let dataPromises = [];

    if (this.user) {
      dataPromises.push(this.missingUserTraitsProxy.getMissingUserTraitsForJob(this.job.id, this.user.id)
      .then(missingUserTraits => {
        this.missingUserTraits = missingUserTraits
      }));

      dataPromises.push(this.applicationProxy.getUserApplicationForJob(this.user.id, this.job.id)
      .then(application => {
        this.application = application;
        this.applicationChange.emit(this.application);
      }));
    }

    this.promises = Promise.all(dataPromises);
  }

  public onApplyForJobButtonClick(): void {
    if (!this.user) {
      this.modalService.showModal('loginOrRegisterModalComponent', false, false, 1);
    } else if (Object.keys(this.missingUserTraits).length < 2) {
      this.modalService.showModal('applyForJobModalComponent', false, true, 1, this.job)
      .then(application => this.appliedForJob(application));
    } else {
      this.modalService.showModal('jobAdditionalUserInfoModalComponent', false, true, 1, this.missingUserTraits)
      .then(() => this.requestedUserInformationSupplied());
    }
  }

  private requestedUserInformationSupplied(): void {
    this.modalService.showModal('applyForJobModalComponent', false, true, 400, this.job)
    .then(application => this.appliedForJob(application));
  }

  private appliedForJob(application: Application): void {
    this.application = application;
    this.applicationChange.emit(this.application);
    this.modalService.showModal('appliedForJobModalComponent', false, false, 400);
  }

  public onConfirmJobButtonClick(): void {
    this.modalService.showModal('signForJobModalComponent', false, true, 1, this.application, this.job)
    .then(application => this.signedForJob(application));
  }

  public signedForJob(application: Application): void {
    this.application = application;
    this.applicationChange.emit(this.application);
    if (Object.keys(this.user.missingPaymentInformation).length > 0) {
      this.modalService.showModal('missingPaymentInformationModalComponent', false, true, 400, this.user.missingPaymentInformation)
      .then(_ => this.modalService.showModal('signedForJobModalComponent', false, false, 400));
    } else {
      this.modalService.showModal('signedForJobModalComponent', false, false, 400);
    }
  }
}
