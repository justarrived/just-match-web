import {Component} from '@angular/core';
import {Input} from '@angular/core';
import {Job} from '../../../models/job/job';
import {map} from 'lodash';
import {OnInit} from '@angular/core';
import {SystemLanguageListener} from '../../../resolvers/system-languages/system-languages.resolver';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
import {UserJob} from '../../../models/user/user-job';
import {UserProxy} from '../../../services/proxy/user-proxy.service';
import {UserResolver} from '../../../resolvers/user/user.resolver';

@Component({
  selector: 'user-jobs',
  templateUrl: './user-jobs.component.html'
})
export class UserJobsComponent extends SystemLanguageListener implements OnInit {
  @Input() public selectedState: string;
  public currentJobs: Job[] = []; // not invoiced
  public historyJobs: Job[] = []; // invoiced
  public userJobs: UserJob[];

  public constructor(
    private userProxy: UserProxy,
    private userResolver: UserResolver,
    protected systemLanguagesResolver: SystemLanguagesResolver
  ) {
    super(systemLanguagesResolver);
  }

  public ngOnInit() {
    this.loadData();
  }

  protected loadData() {
    this.userProxy.getUserJobs(this.userResolver.getUser().id, {include: 'job, job.company'}).then((jobs) => {
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
