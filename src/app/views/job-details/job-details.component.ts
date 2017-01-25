import {Component, OnInit, Input} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Job} from '../../models/job/job';
import {JobProxy} from '../../services/proxy/job-proxy.service';
import {UserManager} from '../../services/user-manager.service';
import {User} from '../../models/user';
import {TranslationService} from '../../services/translation.service';
import {TranslationListener} from '../../components/translation.component';
import {UserProxy} from '../../services/proxy/user-proxy.service';
import {UserJob} from '../../models/user/user-job';
import {Router} from '@angular/router';
import {UserBankAccount} from '../../models/user/user-bank-account';

@Component({
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.scss'],
  providers: [JobProxy]
})
export class JobDetailsComponent extends TranslationListener implements OnInit {
  @Input() isInUserView: boolean;
  @Input() userJobId: number;
  private job: Job;
  private currentJobId: number;
  user: User;
  isCompanyUser: boolean;
  userJob: UserJob;
  countOfApplicants: number = 0;
  showCandidateBankAccountDetails: boolean = false;
  showTermsAccept: boolean = false;
  acceptTerms: boolean = false;
  bankAccount: UserBankAccount = new UserBankAccount();
  errors: any = {};
  jobDetailsVisible: boolean;

  constructor(private route: ActivatedRoute, private jobProxy: JobProxy, private userManager: UserManager, private userProxy: UserProxy, private router: Router, protected translationService: TranslationService) {
    super(translationService);
    this.isCompanyUser = this.userManager.isCompanyUser();
    this.user = userManager.getUser();
    this.route.params.subscribe(params => {
      this.currentJobId = parseInt(params['id']);
    });
    this.jobDetailsVisible = true;
  }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.jobProxy.getJob(this.currentJobId, {include: 'owner,company,hourly_pay,company.company_images,comments'}).then(result => {
      this.job = result;
      this.getJobInfo();
    });
  }

  getJobInfo() {
    if (this.isCompanyUser && this.job.company.id === this.user.company.id) {
      this.jobProxy.getJobUsers(this.job.id, { include: 'user', 'filter[accepted]': true }).then(response => {
        this.userJob = response[0];
        console.log(response);
      });
      this.jobProxy.getJobUsers(this.job.id, {}).then(response => {
        this.countOfApplicants = response.length;
      });
    } else if (this.userManager.getUser() && !this.isCompanyUser) {
      this.userProxy.getUserJobs(this.user.id, { 'filter[job_id]': this.job.id.toString() }).then(response => {
        console.log(response);
        this.userJob = response[0];
      });
    }
  }

  onApplyForJobButtonClick() {
    this.jobProxy.applyForJob(this.job.id).then(response => {
      this.router.navigate(['/confirmation/user-applied']);
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

  switchJobDetailsVisibility() {
    this.jobDetailsVisible = !this.jobDetailsVisible;
  }
}
