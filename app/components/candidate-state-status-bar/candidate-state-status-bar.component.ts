import {Component, OnInit, Input} from '@angular/core';
import {UserJob} from "../../models/user/user-job";
import {JobProxy} from "../../services/job-proxy.service";

@Component({
  moduleId: module.id,
  selector: 'candidate-state-status-bar',
  templateUrl: 'candidate-state-status-bar.component.html',
  styleUrls: ['candidate-state-status-bar.component.css'],

})
export class CandidateStateStatusBarComponent implements OnInit {
  @Input() userJob: UserJob;
  showSendRequestPage: boolean = false;
  showCompleteUserJob: boolean = false;
  starRating: number = 0;
  constructor(private jobProxy: JobProxy) {
  }

  ngOnInit() {
  }

  onAcceptJobButtonClick() {
    this.jobProxy.acceptForJob(this.userJob.job.id, this.userJob.id).then(response => {
      this.userJob = response;
      this.showSendRequestPage = false;
    });
  }

  onStarRatingClick(rateNumber) {
    console.log(rateNumber);
    this.starRating = rateNumber;
  }

}
