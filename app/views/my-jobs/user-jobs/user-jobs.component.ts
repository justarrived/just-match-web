import {Component, Input} from "@angular/core";
import {Job} from "../../../models/job/job";
import {JobProxy} from "../../../services/job-proxy.service";
import {UserManager} from "../../../user-manager.service";
import {UserJob} from "../../../models/user/user-job";
import {map} from "lodash";

@Component({
  moduleId: module.id,
  selector: 'user-jobs',
  templateUrl: 'user-jobs.component.html',
  providers: [JobProxy]
})
export class UserJobsComponent {
  @Input() selectedState: string;
  userJobs: UserJob[];
  currentJobs: Job[] = []; // not invoiced
  historyJobs: Job[] = []; // invoiced

  constructor(private jobProxy: JobProxy, private userManager: UserManager) {
  }

  ngOnInit() {
    this.jobProxy.getUserJobs(this.userManager.getUserId(), {include: 'job, job.company'}).then((jobs) => {
      this.userJobs = jobs;
      this.generateJobSections();
    });

  }

  generateJobSections() {
    this.currentJobs = map(this.userJobs.filter((userJob) => !userJob.invoice.id), userJob => {
      let job = userJob.job;
      job.jobUsers = [userJob];
      return job;
    });

    this.historyJobs = map(this.userJobs.filter((userJob) => !!userJob.invoice.id), userJob => userJob.job);
  }
}
