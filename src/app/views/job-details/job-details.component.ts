import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {Job} from "../../models/job/job";
import {JobProxy} from "../../services/job-proxy.service";
import {UserManager} from "../../user-manager.service";
import {User} from "../../models/user";

@Component({
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.scss'],
  providers: [JobProxy]
})
export class JobDetailsComponent implements OnInit {
  private job: Job;
  user: User;
  isCompanyUser: boolean;

  constructor(private route: ActivatedRoute, private jobProxy: JobProxy, private userManager: UserManager) {
    this.isCompanyUser = this.userManager.isCompanyUser();
    this.route.params.subscribe(params => {
      let jobId = parseInt(params['id']);
      this.jobProxy.getJob(jobId, {include: 'owner,company,hourly_pay,company.company_images,comments'}).then(result => {
        this.job = result;
      });
    });
  }

  ngOnInit() {
  }
}
