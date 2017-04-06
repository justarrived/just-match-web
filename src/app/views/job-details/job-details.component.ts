import {ActivatedRoute} from '@angular/router';
import {Application} from '../../models/api-models/application/application';
import {ApplicationProxy} from '../../proxies/application/application.proxy';
import {Component} from '@angular/core';
import {Input} from '@angular/core';
import {isEmpty} from 'lodash';
import {JARoutes} from '../../routes/ja-routes/ja-routes';
import {Job} from '../../models/api-models/job/job';
import {JobProxy} from '../../proxies/job/job.proxy';
import {MissingUserTraits} from '../../models/api-models/missing-user-traits/missing-user-traits';
import {MissingUserTraitsProxy} from '../../proxies/missing-user-traits/missing-user-traits.proxy';
import {ModalService} from '../../services/modal.service';
import {NavigationService} from '../../services/navigation.service';
import {OnDestroy} from '@angular/core';
import {OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {SystemLanguageListener} from '../../resolvers/system-languages/system-languages.resolver';
import {SystemLanguagesResolver} from '../../resolvers/system-languages/system-languages.resolver';
import {User} from '../../models/api-models/user/user';
import {UserResolver} from '../../resolvers/user/user.resolver';

@Component({
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.scss']
})
export class JobDetailsComponent extends SystemLanguageListener implements OnInit, OnDestroy {
  public application: Application;
  public applyForJobErrorMessageVisible: boolean;
  public countOfApplicants: number = 0;
  public currentJobId: string;
  public errors: any = {};
  public JARoutes = JARoutes;
  public job: Job;
  public jobDetailsVisible: boolean = true;
  public missingUserTraits: MissingUserTraits;
  public user: User;

  private userSubscription: Subscription;
  private routeParamsSubscription: Subscription;

  public constructor(
    private applicationProxy: ApplicationProxy,
    private jobProxy: JobProxy,
    private missingUserTraitsProxy: MissingUserTraitsProxy,
    private navigationService: NavigationService,
    private route: ActivatedRoute,
    private userResolver: UserResolver,
    private modalService: ModalService,
    protected systemLanguagesResolver: SystemLanguagesResolver
  ) {
    super(systemLanguagesResolver);
  }

  public ngOnInit(): void {
    this.initUser();
    this.initRouteParamsSubscription();
  }

  private initUser(): void {
    this.user = this.userResolver.getUser();
    this.userSubscription = this.userResolver.getUserChangeEmitter().subscribe(user => {
      this.user = user;
      this.loadData();
    });
  }

  private initRouteParamsSubscription(): void {
    this.routeParamsSubscription = this.route.params.subscribe(params => {
      this.currentJobId = params['id'];
      this.loadData();
    });
  }

  protected loadData(): void {
    if (this.user) {
      this.missingUserTraitsProxy.getMissingUserTraits(this.currentJobId, this.user.id)
      .then(missingUserTraits => {
        this.missingUserTraits = missingUserTraits}
      );
    }

    this.jobProxy.getJob(this.currentJobId, {
      'include': 'owner,company,hourly_pay,company.company_images,comments'
    })
    .then(result => {
      this.job = result;
      this.getJobInfo();
    });
  }

  private getJobInfo(): void {
    if (this.user) {
      this.applicationProxy.getUserApplications(this.user.id, {
        'filter[job_id]': this.job.id
      })
      .then(response => {
        this.application = response[0];
      });
    }
  }

  public ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
    this.routeParamsSubscription.unsubscribe();
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
    this.modalService.showModal('appliedForJobModalComponent', false, false, 400);
  }

  public switchJobDetailsVisibility(): void {
    this.jobDetailsVisible = !this.jobDetailsVisible;
  }

  public onConfirmJobButtonClick(): void {
    this.modalService.showModal('signForJobModalComponent', false, true, 1, this.application, this.job)
    .then(application => this.signedForJob(application));
  }

  public signedForJob(application: Application): void {
    this.application = application;
    this.modalService.showModal('signedForJobModalComponent', false, false, 400);
  }
}
