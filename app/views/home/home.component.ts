import {Component, OnInit} from "@angular/core";
import {AuthManager} from "../../services/auth-manager.service";
import {JobProxy} from "../../services/job-proxy.service";
import {Job} from "../../models/job/job";
import {SliderComponent} from "../../components/slider/slider.component";

@Component({
  moduleId: module.id,
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css'],
  providers: [JobProxy]
})
export class HomeComponent implements OnInit {
  today: number;
  email: string;
  password: string;
  newJobs: Array<Job>;
  isCompanyUser: boolean;
  constructor(private jobProxy: JobProxy, private authManager: AuthManager) {
    this.isCompanyUser = authManager.isCompanyUser();
  }

  ngOnInit() {
    this.jobProxy.getJobs({include: 'company,hourly-pay,company.company-images', 'filter[filled]':false}).then(result => {
      this.newJobs = result;
      console.log(result);
    });
    this.today = new Date().getDate();
  }

  login() {
    this.authManager.logUser(this.email, this.password).then(user => {
      console.log(user);
    });
  }
}
