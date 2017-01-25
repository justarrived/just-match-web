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

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [JobProxy, UserProxy]
})
export class HomeComponent extends TranslationListener implements OnInit {
  today: number = new Date().getDate();
  email: string;
  password: string;
  newJobs: Job[];
  userJobs: UserJob[];
  jobsAppliedFor: UserJob[];
  isCompanyUser: boolean;
  user: User;
  isEmpty = isEmpty;

  constructor(private jobProxy: JobProxy, private authManager: AuthManager, private userProxy: UserProxy, private userManager: UserManager, protected translationService: TranslationService) {
    super(translationService);

    this.isCompanyUser = userManager.isCompanyUser();
    this.user = userManager.getUser();

    this.authManager.getUserChangeEmmiter().subscribe(user => {
      this.user = user;
    });

  }

  ngOnInit() {
    this.loadData();
    if(this.user) {
      this.loadUserJobs();
      this.loadJobsAppliedFor();
    }
  }

  loadData(): void {
    this.jobProxy.getJobs({include: 'company,hourly_pay,company.company_images', 'filter[filled]': false})
      .then(result => {
        this.newJobs = result.data;
      });
  }

  loadUserJobs(): void {
    this.userProxy.getUserJobs(this.user.id, {include: 'job', 'sort': 'job.job.end_date', 'filter[will_perform]': true, 'page[size]': 5})
      .then(result => {
        this.userJobs = result;
      });
  }

  loadJobsAppliedFor(): void {
    this.userProxy.getUserJobs(this.user.id, {include: 'job', 'sort': '-created_at', 'page[size]': 10})
      .then(result => {
        this.jobsAppliedFor = result;
      });
  }

  userJobsVisible() {
    if(this.user) {
      return !this.isEmpty(this.userJobs);
    }
    return false;
  }

}
