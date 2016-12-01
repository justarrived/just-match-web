import {Component, Input, OnInit} from "@angular/core";
import {Job} from "../../../models/job/job";
import {JobProxy} from "../../../services/job-proxy.service";
import {UserManager} from "../../../user-manager.service";

@Component({
  selector: 'company-jobs',
  templateUrl: './company-jobs.component.html',
  styleUrls: ['./company-jobs.component.scss'],
  providers: [JobProxy]
})
export class CompanyJobsComponent implements OnInit {
  @Input() selectedState: string;
  jobs: Job[];
  currentJobs: Job[] = []; // will perfome, but not performed
  recentJobs: Job[] = []; // not accepted
  missingReviewJobs: Job[] = []; // performed, no invoice
  historyJobs: Job[] = []; // invoiced

  constructor(private jobProxy: JobProxy, private userManager: UserManager) {
  }

  ngOnInit() {
    this.jobProxy.getOwnedJobs(this.userManager.getUserId(), {include: 'job-users,job-users.user,job-users.user.user-images'}).then((jobs) => {
      this.jobs = jobs;
      this.generateJobSections();
    });

  }

  generateJobSections() {
    this.recentJobs = this.jobs.filter((job) => job.jobUsers.length === 0);

    this.jobs.filter((job) => job.jobUsers.length > 0).forEach((job) => {
      // get history tab jobs
      let usersInvoiced = job.jobUsers.filter((jobUser) => !!jobUser.invoice.id);
      if (usersInvoiced.length > 0) {
        job.jobUsers = usersInvoiced;
        this.historyJobs.push(job);
        return;
      }

      // get missing review jobs
      let usersPerformedAndNotInvoiced = job.jobUsers.filter((jobUser) => !jobUser.invoice.id && jobUser.performed);
      if (usersPerformedAndNotInvoiced.length > 0) {
        job.jobUsers = usersPerformedAndNotInvoiced;
        this.missingReviewJobs.push(job);
        return;
      }

      // get current jobs
      let usersWillPerformNotPerformed = job.jobUsers.filter((jobUser) => jobUser.willPerform && !jobUser.performed);
      if (usersWillPerformNotPerformed.length > 0) {
        job.jobUsers = usersWillPerformNotPerformed;
        this.currentJobs.push(job);
        return;
      }

      this.recentJobs.push(job);
    });
  }
}
