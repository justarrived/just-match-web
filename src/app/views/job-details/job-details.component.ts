import {ActivatedRoute} from '@angular/router';
import {Component} from '@angular/core';
import {Input} from '@angular/core';
import {JARoutes} from '../../routes/ja-routes';
import {Job} from '../../models/job/job';
import {JobProxy} from '../../services/proxy/job-proxy.service';
import {NavigationService} from '../../services/navigation.service';
import {OnDestroy} from '@angular/core';
import {OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {SystemLanguageListener} from '../../resolvers/system-languages/system-languages.resolver';
import {SystemLanguagesResolver} from '../../resolvers/system-languages/system-languages.resolver';
import {User} from '../../models/user';
import {UserJob} from '../../models/user/user-job';
import {UserProxy} from '../../services/proxy/user-proxy.service';
import {UserResolver} from '../../resolvers/user/user.resolver';

@Component({
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.scss']
})
export class JobDetailsComponent extends SystemLanguageListener implements OnInit, OnDestroy {
  @Input() public isInUserView: boolean;
  @Input() public userJobId: number;

  public applyForJobErrorMessageVisible: boolean;
  public countOfApplicants: number = 0;
  public currentJobId: number;
  public errors: any = {};
  public JARoutes = JARoutes;
  public job: Job;
  public jobDetailsVisible: boolean = true;
  public user: User;
  public userJob: UserJob;

  private userSubscription: Subscription;
  private routeParamsSubscription: Subscription;

  public constructor(
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
      this.currentJobId = parseInt(params['id']);
    });
  }

  protected loadData(): void {
    this.jobProxy.getJob(
      this.currentJobId,
      {
        include: 'owner,company,hourly_pay,company.company_images,comments'
      })
      .then(result => {
        this.job = result;
        this.getJobInfo();
      });
  }

  private getJobInfo(): void {
    if (this.user) {
      this.userProxy.getUserJobs(
        this.user.id,
        {
          'filter[job_id]': this.job.id.toString()
        })
        .then(response => {
          this.userJob = response[0];
        });
    }
  }

  public ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
    this.routeParamsSubscription.unsubscribe();
  }

  public onApplyForJobButtonClick(): void {
    this.jobProxy.applyForJob(this.job.id)
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
    return this.jobProxy.confirmForJob(this.job.id, this.userJob.id)
      .then(response => {
        this.userJob = response;
        this.applyForJobErrorMessageVisible = false;
      }).catch(errors => {
        this.applyForJobErrorMessageVisible = true;
      });
  }
}
