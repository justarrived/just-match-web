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
import {UserBankAccount} from '../../models/user/user-bank-account';
import {NavigationService} from '../../services/navigation.service';
import {AuthManager} from '../../services/auth-manager.service';
import {JARoutes} from '../../routes/ja-routes';

@Component({
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.scss'],
  providers: [JobProxy]
})
export class JobDetailsComponent extends TranslationListener implements OnInit {
  @Input() private isInUserView: boolean;
  @Input() private userJobId: number;
  private job: Job;
  private currentJobId: number;
  private user: User;
  private userJob: UserJob;
  private countOfApplicants: number = 0;
  private showCandidateBankAccountDetails: boolean = false;
  private showTermsAccept: boolean = false;
  private acceptTerms: boolean = false;
  private bankAccount: UserBankAccount = new UserBankAccount();
  private errors: any = {};
  private jobDetailsVisible: boolean;
  private JARoutes = JARoutes;

  constructor(
    private route: ActivatedRoute,
    private jobProxy: JobProxy,
    private userManager: UserManager,
    private userProxy: UserProxy,
    private authManager: AuthManager,
    private navigationService: NavigationService,
    protected translationService: TranslationService
  ) {
    super(translationService);
    this.user = userManager.getUser();
    this.route.params.subscribe(params => {
      this.currentJobId = parseInt(params['id']);
    });
    this.jobDetailsVisible = true;
    this.authManager.getUserChangeEmmiter().subscribe(user => {
      this.user = user;
    });
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

  private getJobInfo() {
    if (this.user) {
      this.userProxy.getUserJobs(this.user.id, { 'filter[job_id]': this.job.id.toString() }).then(response => {
        this.userJob = response[0];
      });
    }
  }

  private onApplyForJobButtonClick() {
    this.jobProxy.applyForJob(this.job.id).then(response => {
      this.navigationService.navigate(JARoutes.confirmation, 'user-applied-for-job');
    });
  }

  private onConfirmJobButtonClick() {
    if (!this.userJob.user.frilansFinansPaymentDetails) {
      this.showTermsAccept = true;
      this.acceptTerms = false;
      this.showCandidateBankAccountDetails = false;
      return;
    }
    this.confirmJob();
  }

  private submitBankAccount() {
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

  private switchJobDetailsVisibility() {
    this.jobDetailsVisible = !this.jobDetailsVisible;
  }
}
