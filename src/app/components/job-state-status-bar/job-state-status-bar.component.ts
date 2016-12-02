import {Component, OnInit, Input} from "@angular/core";
import {User} from "../../models/user";
import {Job} from "../../models/job/job";
import {UserManager} from "../../services/user-manager.service";
import {UserProxy} from "../../services/proxy/user-proxy.service";
import {UserJob} from "../../models/user/user-job";
import {JobProxy} from "../../services/job-proxy.service";
import {Router} from "@angular/router";
import {UserBankAccount} from "../../models/user/user-bank-account";


@Component({
  selector: 'job-state-status-bar',
  templateUrl: './job-state-status-bar.component.html',
  styleUrls: ['./job-state-status-bar.component.scss']
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
  showCandidateBankAccountDetails: boolean = false;
  showTermsAccept: boolean = false;
  acceptTerms: boolean = false;
  bankAccount: UserBankAccount = new UserBankAccount();
  errors: any = {};

  constructor(private userManager: UserManager, private userProxy: UserProxy, private jobProxy: JobProxy, private router: Router) {
    this.user = userManager.getUser();
    this.isCompanyUser = userManager.isCompanyUser();
  }

  ngOnInit() {
    if (this.isCompanyUser && this.job.company.id === this.user.company.id) {
      this.jobProxy.getJobUsers(this.job.id, {include: 'user', 'filter[accepted]': true}).then(response => {
        this.userJob = response[0];
        console.log(response);
      });
      this.jobProxy.getJobUsers(this.job.id, {}).then(response => {
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
    if (!this.userJob.user.frilansFinansPaymentDetails) {
      this.showTermsAccept = true;
      this.acceptTerms = false;
      this.showCandidateBankAccountDetails = false;
      return;
    }
    this.confirmJob();
  }

  submitBankAccount() {
    this.userProxy.createFrilansFinans(this.userJob.user.id, this.bankAccount.toJsonObject()).then(reponse => {
      return this.confirmJob();
    }).then(response => {
      this.showTermsAccept = false;
      this.userJob.willPerform = true;
    }, errors => {
      this.errors = errors.details;
    });
  }

  private confirmJob(): Promise<any> {
    return this.jobProxy.confirmForJob(this.job.id, this.userJob.id).then(response => {
      this.userJob = response;
    });
  }
}

