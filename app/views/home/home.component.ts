import {Component, OnInit} from "@angular/core";
import {JobProxy} from "../../services/job-proxy.service";
import {Job} from "../../models/job/job";
import {TranslationService} from "../../services/translation.service";
import {UserManager} from "../../user-manager.service";
import {User} from "./models/user";

@Component({
  moduleId: module.id,
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css'],
  providers: [JobProxy]
})
export class HomeComponent implements OnInit {
  today: number = new Date().getDate();
  email: string;
  password: string;
  newJobs: Job[];
  isCompanyUser: boolean;
  user: User;

  constructor(private jobProxy: JobProxy, private userManager: UserManager, private translationService: TranslationService) {
    this.isCompanyUser = userManager.isCompanyUser();
    this.user = userManager.getUser();
    this.translationService.getLanguageChangeEmitter().subscribe(() => {
    });
  }

  ngOnInit() {
    this.jobProxy.getJobs({include: 'company,hourly_pay,company.company_images', 'filter[filled]': false})
      .then(result => {
        this.newJobs = result.data;
      });
  }
}
