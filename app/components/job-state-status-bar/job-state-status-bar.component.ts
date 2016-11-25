import {Component, OnInit, Input} from '@angular/core';
import {User} from "../../models/user";
import {Job} from "../../models/job/job";
import {UserManager} from "../../user-manager.service";
import {UserProxy} from "../../services/user-proxy.service";
import {UserJob} from "../../models/user/user-job";
import {JobProxy} from "../../services/job-proxy.service";
import {Router} from "@angular/router";


@Component({
  moduleId: module.id,
  selector: 'job-state-status-bar',
  templateUrl: 'job-state-status-bar.component.html',
  styleUrls: ['job-state-status-bar.component.css']
})
export class JobStateStatusBarComponent implements OnInit {
  @Input() job: Job;
  @Input() isInUserView: boolean;
  @Input() userJobId: number;
  @Input() jobId: number;
  isCompanyUser: boolean;
  user: User;
  userJob: UserJob;
  countOfApplicants: number = 0;
  showSendRequestPage: boolean = false;
  showCandidateBankAccountDetails: boolean = false;

  constructor(private userManager: UserManager, private userProxy: UserProxy, private jobProxy: JobProxy, private router: Router) {
    this.user = userManager.getUser();
    this.isCompanyUser = userManager.isCompanyUser();
  }

  ngOnInit() {
    if (this.isCompanyUser && this.job.company.id === this.user.company.id) {
      this.jobProxy.getUserJobs(this.job.id, {include: 'user', 'filter[accepted]': true}).then(response => {
        this.userJob = response[0];
        console.log(response);
      });
      this.jobProxy.getUserJobs(this.job.id, {}).then(response => {
        this.countOfApplicants = response.length;
      });
    } else if (this.userManager.getUser() && !this.isCompanyUser) {
      this.userProxy.getUserJobs(this.user.id, {'filter[job_id]': this.job.id.toString()}).then(response => {
        console.log(response);
        this.userJob = response[0];
      });
    }
  }

  onApplyForJobButtonClick() {
    this.jobProxy.applyForJob(this.job.id).then(response => {
      this.router.navigate(['/confirmation/job']);
    });
  }

  onConfirmJobButtonClick() {
    // if (!this.userJob.user.frilansFinansPaymentDetails) {
    //   this.showCandidateBankAccountDetails = true;
    //   return;
    // }
    this.jobProxy.confirmForJob(this.job.id, this.userJob.id).then(response => {
      this.userJob = response;
    });
  }
}

