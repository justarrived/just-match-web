import {ActivatedRoute} from '@angular/router';
import {Application} from '../../models/api-models/application/application';
import {ApplicationProxy} from '../../proxies/application/application.proxy';
import {AppliedForJobModalComponent} from '../../components/modals/applied-for-job-modal/applied-for-job-modal.component';
import {ApplyForJobModalComponent} from '../../components/modals/apply-for-job-modal/apply-for-job-modal.component';
import {Component} from '@angular/core';
import {Input} from '@angular/core';
import {isEmpty} from 'lodash';
import {JARoutes} from '../../routes/ja-routes/ja-routes';
import {Job} from '../../models/api-models/job/job';
import {JobAdditionalUserInfoModalComponent} from '../../components/modals/job-additional-user-info-modal/job-additional-user-info-modal.component';
import {JobProxy} from '../../proxies/job/job.proxy';
import {LoginModalComponent} from '../../components/modals/login-modal/login-modal.component';
import {MissingUserTraits} from '../../models/api-models/missing-user-traits/missing-user-traits';
import {MissingUserTraitsProxy} from '../../proxies/missing-user-traits/missing-user-traits.proxy';
import {NavigationService} from '../../services/navigation.service';
import {OnDestroy} from '@angular/core';
import {OnInit} from '@angular/core';
import {RegisteredModalComponent} from '../../components/modals/registered-modal/registered-modal.component';
import {RegisterModalComponent} from '../../components/modals/register-modal/register-modal.component';
import {SignedForJobModalComponent} from '../../components/modals/signed-for-job-modal/signed-for-job-modal.component';
import {SignForJobModalComponent} from '../../components/modals/sign-for-job-modal/sign-for-job-modal.component';
import {Subscription} from 'rxjs/Subscription';
import {SystemLanguageListener} from '../../resolvers/system-languages/system-languages.resolver';
import {SystemLanguagesResolver} from '../../resolvers/system-languages/system-languages.resolver';
import {User} from '../../models/api-models/user/user';
import {UserResolver} from '../../resolvers/user/user.resolver';
import {ViewChild} from '@angular/core';

@Component({
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.scss']
})
export class JobDetailsComponent extends SystemLanguageListener implements OnInit, OnDestroy {
  @ViewChild('appliedForJobModalComponent') public appliedForJobModalComponent: AppliedForJobModalComponent;
  @ViewChild('applyForJobModalComponent') public applyForJobModalComponent: ApplyForJobModalComponent;
  @ViewChild('jobAdditionalUserInfoModalComponent') public jobAdditionalUserInfoModalComponent: JobAdditionalUserInfoModalComponent;
  @ViewChild('loginModalComponent') public loginModalComponent: LoginModalComponent;
  @ViewChild('registeredModalComponent') public registeredModalComponent: RegisteredModalComponent;
  @ViewChild('registerModalComponent') public registerModalComponent: RegisterModalComponent;
  @ViewChild('signedForJobModalComponent') public signedForJobModalComponent: SignedForJobModalComponent;
  @ViewChild('signForJobModalComponent') public signForJobModalComponent: SignForJobModalComponent;

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
    this.registerModalComponent.show();
  }

  public registered(user: User): void {
    this.registerModalComponent.hide();
    setTimeout(() => {
      this.registeredModalComponent.show();
    }, 500);
  }

  public onLoginButtonClick(): void {
    this.loginModalComponent.show();
  }

  public loggedIn(user: User): void {
    this.loginModalComponent.hide();
  }

  public onApplyForJobButtonClick(): void {
    if (Object.keys(this.missingUserTraits).length < 2) {
      this.applyForJobModalComponent.show();
    } else {
      this.jobAdditionalUserInfoModalComponent.show();
    }
  }

  public requestedUserInformationSupplied(): void {
    this.jobAdditionalUserInfoModalComponent.hide();
    setTimeout(() => {
      this.applyForJobModalComponent.show();
    }, 500);
  }

  public appliedForJob(application: Application): void {
    this.application = application;
    this.applyForJobModalComponent.hide();
    setTimeout(() => {
      this.appliedForJobModalComponent.show();
    }, 500);
  }

  public switchJobDetailsVisibility(): void {
    this.jobDetailsVisible = !this.jobDetailsVisible;
  }

  public onConfirmJobButtonClick(): void {
    this.signForJobModalComponent.show();
  }

  public signedForJob(application: Application): void {
    this.application = application;
    this.signForJobModalComponent.hide();
    setTimeout(() => {
      this.signedForJobModalComponent.show();
    }, 500);
  }
}
