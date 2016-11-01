import {Component, OnInit} from "@angular/core";
import {AuthManager} from "../../services/auth-manager.service";
import {JobProxy} from "../../services/job-proxy.service";
import {Job} from "../../models/job/job";
import {SliderComponent} from "../../components/slider/slider.component";
import {TranslationService} from "../../services/translation.service";
import {UserManager} from "../../user-manager.service";

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
  newJobs: Array<Job>;
  isCompanyUser: boolean;

  constructor(private jobProxy: JobProxy, private userManager: UserManager, private translationService: TranslationService) {
    this.isCompanyUser = userManager.isCompanyUser();
    this.translationService.getLanguageChangeEmitter().subscribe(() => {
      this.ngOnInit();
    });
  }

  ngOnInit() {
    this.jobProxy.getJobs({include: 'company,hourly_pay,company.company_images', 'filter[filled]': false})
      .then(result => this.newJobs = result);
  }
}
