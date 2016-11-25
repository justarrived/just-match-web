import {Component, OnInit, Input} from '@angular/core';
import {UserJob, Invoice} from "../../models/user/user-job";
import {JobProxy} from "../../services/job-proxy.service";
import {TranslationService} from "../../services/translation.service";
import {Router} from "@angular/router";

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
  showUserRating: boolean = false;
  starRating: number = 0;
  userJobComment: string;

  constructor(private jobProxy: JobProxy, private translationService: TranslationService, private router: Router) {
  }

  ngOnInit() {
  }

  onAcceptJobButtonClick() {
    this.jobProxy.acceptForJob(this.userJob.job.id, this.userJob.id).then(response => {
      this.userJob = response;
      this.showSendRequestPage = false;
      this.router.navigate(['/jobs', this.userJob.job.id]);
    });
  }

  onStarRatingClick(rateNumber) {
    this.starRating = rateNumber;
  }

  onJobDoneButtonClick() {
    let userRating = { //TODO: create userRating model
      score: this.starRating,
      body: this.userJobComment,
      language_id: this.translationService.getSelectedLanguage().id,
      user_id: this.userJob.user.id
    };
    this.jobProxy.createInvoice(this.userJob.job.id, this.userJob.id).then(result => {
      this.userJob.invoice = new Invoice(result);
      return this.jobProxy.addRating(this.userJob.job.id, userRating);
    }).then(result => {
      this.showCompleteUserJob = false;
      this.showUserRating = false;
    }, error => {
      console.log(error);
    });
  }

}
