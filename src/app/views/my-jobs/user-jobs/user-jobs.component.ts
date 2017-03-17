import {Component, Input, OnInit} from '@angular/core';
import {Job} from '../../../models/job/job';
import {UserManager} from '../../../services/user-manager.service';
import {UserJob} from '../../../models/user/user-job';
import {map} from 'lodash';
import {UserProxy} from '../../../services/proxy/user-proxy.service';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
import {SystemLanguageListener} from '../../../resolvers/system-languages/system-languages.resolver';

@Component({
  selector: 'user-jobs',
  templateUrl: './user-jobs.component.html'
})
export class UserJobsComponent extends SystemLanguageListener implements OnInit {
  @Input() selectedState: string;
  userJobs: UserJob[];
  currentJobs: Job[] = []; // not invoiced
  historyJobs: Job[] = []; // invoiced

  constructor(
    private userProxy: UserProxy,
    private userManager: UserManager,
    protected systemLanguagesResolver: SystemLanguagesResolver
  ) {
    super(systemLanguagesResolver);
  }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.userProxy.getUserJobs(this.userManager.getUserId(), {include: 'job, job.company'}).then((jobs) => {
      this.userJobs = jobs;
      this.generateJobSections();
    });
  }

  private generateJobSections() {
    this.currentJobs = map(this.userJobs.filter((userJob) => !userJob.invoice.id), userJob => {
      let job = userJob.job;
      job.jobUsers = [userJob];
      return job;
    });

    this.historyJobs = map(this.userJobs.filter((userJob) => !!userJob.invoice.id), userJob => userJob.job);
  }
}
