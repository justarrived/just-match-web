import {ActivatedRoute} from '@angular/router';
import {AuthManager} from '../../services/auth-manager.service';
import {Component} from '@angular/core';
import {Input} from '@angular/core';
import {JARoutes} from '../../routes/ja-routes';
import {Job} from '../../models/job/job';
import {JobProxy} from '../../services/proxy/job-proxy.service';
import {NavigationService} from '../../services/navigation.service';
import {OnInit} from '@angular/core';
import {SystemLanguageListener} from '../../resolvers/system-languages/system-languages.resolver';
import {SystemLanguagesResolver} from '../../resolvers/system-languages/system-languages.resolver';
import {User} from '../../models/user';
import {UserJob} from '../../models/user/user-job';
import {UserManager} from '../../services/user-manager.service';
import {UserProxy} from '../../services/proxy/user-proxy.service';

@Component({
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.scss']
})
export class JobDetailsComponent extends SystemLanguageListener implements OnInit {
  @Input() isInUserView: boolean;
  @Input() userJobId: number;
  job: Job;
  currentJobId: number;
  user: User;
  userJob: UserJob;
  countOfApplicants: number = 0;
  errors: any = {};
  jobDetailsVisible: boolean;
  applyForJobErrorMessageVisible: boolean = false;
  JARoutes = JARoutes;

  constructor(
    private route: ActivatedRoute,
    private jobProxy: JobProxy,
    private userManager: UserManager,
    private userProxy: UserProxy,
    private authManager: AuthManager,
    private navigationService: NavigationService,
    protected systemLanguagesResolver: SystemLanguagesResolver
  ) {
    super(systemLanguagesResolver);
    this.user = userManager.getUser();
    this.route.params.subscribe(params => {
      this.currentJobId = parseInt(params['id']);
    });
    this.jobDetailsVisible = true;
    this.authManager.getUserChangeEmmiter().subscribe(user => {
      this.user = user;
    });
  }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
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

  private getJobInfo() {
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

  onApplyForJobButtonClick() {
    this.jobProxy.applyForJob(this.job.id)
      .then(response => {
        this.navigationService.navigate(JARoutes.confirmation, 'user-applied-for-job');
      });
  }

  switchJobDetailsVisibility() {
    this.jobDetailsVisible = !this.jobDetailsVisible;
  }

  onConfirmJobButtonClick() {
    this.confirmJob();
  }

  confirmJob(): Promise<any> {
    return this.jobProxy.confirmForJob(this.job.id, this.userJob.id)
      .then(response => {
        this.userJob = response;
        this.applyForJobErrorMessageVisible = false;
      }).catch(errors => {
        this.applyForJobErrorMessageVisible = true;
      });
  }
}
