import {Application} from '../../../models/api-models/application/application';
import {ApplicationProxy} from '../../../proxies/application/application.proxy';
import {Component} from '@angular/core';
import {EventEmitter} from '@angular/core';
import {Input} from '@angular/core';
import {Job} from '../../../models/api-models/job/job';
import {MissingUserTraits} from '../../../models/api-models/missing-user-traits/missing-user-traits';
import {MissingUserTraitsProxy} from '../../../proxies/missing-user-traits/missing-user-traits.proxy';
import {ModalService} from '../../../services/modal.service';
import {OnDestroy} from '@angular/core';
import {OnInit} from '@angular/core';
import {Output} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {SystemLanguageListener} from '../../../resolvers/system-languages/system-languages.resolver';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
import {User} from '../../../models/api-models/user/user';
import {UserResolver} from '../../../resolvers/user/user.resolver';

@Component({
  selector: 'job-actions-header',
  styleUrls: ['./job-actions-header.component.scss'],
  template: `
    <div
      class="ui basic center aligned segment job-actions-header"
      style="padding: 0; padding-bottom: 20px">
      <sm-loader
        [promise]="promises"
        class="inverted">
      </sm-loader>
      <h1 class="job-actions-header-title wrap-long-words">
        {{job.translatedText.name}}
      </h1>
      <base-button
        (click)="onApplyForJobButtonClick()"
        [buttonText]="'job.actions.header.apply' | translate"
        *ngIf="(user && !application)"
        kind="primary-light"
        size="large">
      </base-button>
      <div
        style="width: 300px; margin: 0 auto"
        *ngIf="!user">
        <base-button
          (click)="onRegisterButtonClick()"
          [buttonText]="'job.actions.header.register' | translate"
          [fluid]="true"
          kind="primary-light"
          size="medium">
        </base-button>
        <br/>
        <base-button
          (click)="onLoginButtonClick()"
          [buttonText]="'job.actions.header.login' | translate"
          [fluid]="true"
          kind="primary-light"
          size="medium">
        </base-button>
      </div>
      <h3 *ngIf="application && !application.accepted  && !application.willPerform">
        {{'job.actions.header.applied' | translate}}
      </h3>
      <div *ngIf="application && application.accepted && !application.willPerform">
        <h5 class="time-left-text">
          {{'job.actions.header.offer' | translate: {hours: application.remainsConfirmationHours, minutes: application.remainsConfirmationMinutes} }}
        </h5>
        <base-button
          (click)="onConfirmJobButtonClick()"
          [buttonText]="'job.actions.header.confirm' | translate"
          kind="primary-light"
          size="large">
        </base-button>
      </div>
      <h3 *ngIf="application && application.willPerform && !application.jobEnded">
        {{'job.actions.header.hired' | translate}}
      </h3>
      <h3 *ngIf="application && application.willPerform && application.jobEnded">
        {{'job.actions.header.performed' | translate}}
      </h3>
    </div>`
})
export class JobActionsHeaderComponent extends SystemLanguageListener implements OnInit, OnDestroy {
  @Input() public application = null as Application;
  @Input() public job = null as Job;
  @Output() public applicationChange: EventEmitter<Application> = new EventEmitter<Application>();

  public missingUserTraits: MissingUserTraits;
  public promises: Promise<any>;
  public user: User;

  private userSubscription: Subscription;

  public constructor(
    private applicationProxy: ApplicationProxy,
    private missingUserTraitsProxy: MissingUserTraitsProxy,
    private userResolver: UserResolver,
    private modalService: ModalService,
    protected systemLanguagesResolver: SystemLanguagesResolver
  ) {
    super(systemLanguagesResolver);
  }

  public ngOnInit(): void {
    this.initUser();
    this.loadData();
  }

  private initUser(): void {
    this.user = this.userResolver.getUser();
    this.userSubscription = this.userResolver.getUserChangeEmitter().subscribe(user => {
      this.user = user;
      this.loadData();
    });
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

  public ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

  public onRegisterButtonClick(): void {
    this.modalService.showModal('registerModalComponent', false, false, 1);
  }

  public onLoginButtonClick(): void {
    this.modalService.showModal('loginModalComponent', false, false, 1);
  }

  public onApplyForJobButtonClick(): void {
    if (Object.keys(this.missingUserTraits).length < 2) {
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
    this.modalService.showModal('signedForJobModalComponent', false, false, 400);
  }
}
