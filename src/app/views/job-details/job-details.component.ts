import {ActivatedRoute} from '@angular/router';
import {Application} from '../../models/api-models/application/application';
import {ApplicationProxy} from '../../proxies/application/application.proxy';
import {Component} from '@angular/core';
import {Input} from '@angular/core';
import {JARoutes} from '../../routes/ja-routes';
import {Job} from '../../models/api-models/job/job';
import {JobProxy} from '../../proxies/job/job.proxy';
import {NavigationService} from '../../services/navigation.service';
import {OnDestroy} from '@angular/core';
import {OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {SystemLanguageListener} from '../../resolvers/system-languages/system-languages.resolver';
import {SystemLanguagesResolver} from '../../resolvers/system-languages/system-languages.resolver';
import {User} from '../../models/api-models/user/user';
import {UserProxy} from '../../services/proxy/user-proxy.service';
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
  public user: User;

  private userSubscription: Subscription;
  private routeParamsSubscription: Subscription;

  public constructor(
    private applicationProxy: ApplicationProxy,
    private jobProxy: JobProxy,
    private navigationService: NavigationService,
    private route: ActivatedRoute,
    private userProxy: UserProxy,
    private userResolver: UserResolver,
    protected systemLanguagesResolver: SystemLanguagesResolver
  ) {
    super(systemLanguagesResolver);
  }

  public ngOnInit(): void {
    this.initUser();
    this.initRouteParamsSubscription();
    this.loadData();
  }

  private initUser(): void {
    this.user = this.userResolver.getUser();
    this.userSubscription = this.userResolver.getUserChangeEmitter().subscribe(user => {
      this.user = user;
    });
  }

  private initRouteParamsSubscription(): void {
    this.routeParamsSubscription = this.route.params.subscribe(params => {
      this.currentJobId = params['id'];
    });
  }

  protected loadData(): void {
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

  public onApplyForJobButtonClick(): void {
    this.applicationProxy.createApplication(this.job.id, {
      'user_id': this.user.id
    })
    .then(response => {
      this.navigationService.navigate(JARoutes.confirmation, 'user-applied-for-job');
    });
  }

  public switchJobDetailsVisibility(): void {
    this.jobDetailsVisible = !this.jobDetailsVisible;
  }

  public onConfirmJobButtonClick(): void {
    this.confirmJob();
  }

  public confirmJob(): Promise<any> {
    return this.applicationProxy.confirmApplication(this.job.id, this.application.id)
      .then(response => {
        this.application = response;
        this.applyForJobErrorMessageVisible = false;
      })
      .catch(errors => {
        this.applyForJobErrorMessageVisible = true;
      });
  }
}
