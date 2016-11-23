import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {JobProxy} from "../../services/job-proxy.service";
import {UserJob} from "../../models/user/user-job";
import {Job} from "../../models/job/job";

@Component({
  moduleId: module.id,
  templateUrl: 'candidates.component.html',
  styleUrls: ['candidates.component.css'],
  providers: [JobProxy]
})
export class CandidatesComponent implements OnInit {
  jobId: number;
  job: Job;
  userJobs: UserJob[];

  constructor(private route: ActivatedRoute, private jobProxy: JobProxy) {
    this.route.params.subscribe(params => {
      this.jobId = parseInt(params['id']);
    });
  }

  ngOnInit() {
    this.jobProxy.getJob(this.jobId, {include: 'job_users,company,hourly_pay,company.company_images'}).then(response => {
      this.job = response;
    });
    this.jobProxy.getUserJobs(this.jobId, {include: 'user,user.user_images'}).then(response => {
      console.log(response);
      this.userJobs = response;
    });
  }

}
