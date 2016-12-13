import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Job} from '../../models/job/job';
import {JobProxy} from '../../services/proxy/job-proxy.service';
import {UserManager} from '../../services/user-manager.service';
import {User} from '../../models/user';
import {TranslationService} from "../../services/translation.service";
import {TranslationListener} from "../../components/translation.component";

@Component({
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.scss'],
  providers: [JobProxy]
})
export class JobDetailsComponent extends TranslationListener {
  private job: Job;
  private currentJobId: number;
  user: User;
  isCompanyUser: boolean;

  constructor(private route: ActivatedRoute, private jobProxy: JobProxy, private userManager: UserManager, protected translationService: TranslationService) {
    super(translationService);
    this.isCompanyUser = this.userManager.isCompanyUser();
    this.route.params.subscribe(params => {
      this.currentJobId = parseInt(params['id']);
      this.loadData();
    });
  }

  loadData() {
    this.jobProxy.getJob(this.currentJobId, {include: 'owner,company,hourly_pay,company.company_images,comments'}).then(result => {
      this.job = result;
    });
  }
}
