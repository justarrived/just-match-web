import {Component, OnInit} from '@angular/core';
import {JobProxy} from '../../services/proxy/job-proxy.service';
import {Job} from '../../models/job/job';
import {TranslationService} from '../../services/translation.service';
import {UserManager} from '../../services/user-manager.service';
import {User} from '../../models/user';
import {TranslationListener} from "../../components/translation.component";

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [JobProxy]
})
export class HomeComponent extends TranslationListener implements OnInit {
  today: number = new Date().getDate();
  email: string;
  password: string;
  newJobs: Job[];
  isCompanyUser: boolean;
  user: User;

  constructor(private jobProxy: JobProxy, private userManager: UserManager, protected translationService: TranslationService) {
    super(translationService);

    this.isCompanyUser = userManager.isCompanyUser();
    this.user = userManager.getUser();
  }

  ngOnInit() {
    this.loadData();
  }

  loadData(): void {
    this.jobProxy.getJobs({include: 'company,hourly_pay,company.company_images', 'filter[filled]': false})
      .then(result => {
        this.newJobs = result.data;
      });
  }
}
