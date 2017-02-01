import {Component, OnInit} from '@angular/core';
import {JobProxy} from '../../services/proxy/job-proxy.service';
import {UserProxy} from '../../services/proxy/user-proxy.service';
import {Job} from '../../models/job/job';
import {UserJob} from '../../models/user/user-job';
import {TranslationService} from '../../services/translation.service';
import {UserManager} from '../../services/user-manager.service';
import {User} from '../../models/user';
import {TranslationListener} from '../../components/translation.component';
import {isEmpty} from 'lodash';
import {AuthManager} from '../../services/auth-manager.service';
import {JARoutes} from '../../routes/ja-routes';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [JobProxy, UserProxy]
})
export class HomeComponent extends TranslationListener implements OnInit {
  private newJobs: Job[];
  private userJobs: UserJob[];
  private jobsAppliedFor: UserJob[];
  private user: User;
  private isEmpty = isEmpty;
  private JARoutes = JARoutes;

  constructor(
    private jobProxy: JobProxy,
    private authManager: AuthManager,
    private userProxy: UserProxy,
    private userManager: UserManager,
    protected translationService: TranslationService
  ) {
    super(translationService);

    this.user = userManager.getUser();

    this.authManager.getUserChangeEmmiter().subscribe(user => {
      this.user = user;
    });

  }

  ngOnInit() {
    this.loadData();
  }

  loadData(): void {
    this.loadJobs();
    if (this.user) {
      this.loadUserJobs();
      this.loadJobsAppliedFor();
    }
  }

  private loadJobs(): void {
    this.jobProxy.getJobs({ include: 'company,hourly_pay,company.company_images', 'filter[filled]': false })
      .then(result => {
        this.newJobs = result.data;
      });
  }

  private loadUserJobs(): void {
    this.userProxy.getUserJobs(this.user.id, { include: 'job', 'sort': 'job.job.end_date', 'filter[will_perform]': true, 'page[size]': 5 })
      .then(result => {
        this.userJobs = result;
      });
  }

  private loadJobsAppliedFor(): void {
    this.userProxy.getUserJobs(this.user.id, { include: 'job', 'sort': '-created_at', 'page[size]': 10 })
      .then(result => {
        this.jobsAppliedFor = result;
      });
  }

  private userJobsVisible() {
    if (this.user) {
      return !this.isEmpty(this.userJobs);
    }
    return false;
  }
}
