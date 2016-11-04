import {Component, OnInit} from "@angular/core";
import {Job} from "../../models/job/job";
import {JobProxy} from "../../services/job-proxy.service";

@Component({
  moduleId: module.id,
  templateUrl: "jobs.component.html",
  styleUrls: ["jobs.component.css"],
  providers: [JobProxy]
})
export class JobsComponent implements OnInit {
  jobs: Job[];
  totalJobs: number;
  page: number = 0;
  pageSize: number = 10;

  constructor(private jobProxy: JobProxy) {
  }

  ngOnInit() {
    this.jobProxy.getJobs({include: 'owner,company,hourly_pay,company.company_images', 'filter[filled]': false})
      .then(result => {
        this.jobs = result.data;
        this.totalJobs = result.total;
      });
  }
}
