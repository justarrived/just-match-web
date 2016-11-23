import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {JobProxy} from "../../services/job-proxy.service";
import {UserJob} from "../../models/user/user-job";

@Component({
  moduleId: module.id,
  templateUrl: 'candidate.component.html',
  styleUrls: ['candidate.component.css'],
  providers: [JobProxy]
})
export class CandidateComponent implements OnInit {
  jobId: number;
  userJobId: number;
  userJob: UserJob;

  constructor(private route: ActivatedRoute, private jobProxy: JobProxy) {
    this.route.params.subscribe(params => {
      this.jobId = parseInt(params['id']);
      this.userJobId = parseInt(params['userJobId']);
    });
  }

  ngOnInit() {
    this.jobProxy.getUserJob(this.jobId, this.userJobId, {include: 'job,job,hourly_pay,user,user.user_images'}).then(response => {
      this.userJob = response;
    });
  }
}
