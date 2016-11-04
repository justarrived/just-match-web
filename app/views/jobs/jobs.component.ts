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
  totalJobs: number = 1;
  page: number = 1;
  pageSize: number = 10;

  constructor(private jobProxy: JobProxy) {
  }

  ngOnInit() {
    this.jobProxy.getJobs({include: 'owner,company,hourly_pay,company.company_images', 'filter[filled]': false, 'page[number]': this.page.toString()})
      .then(result => {
        this.jobs = result.data;
        this.totalJobs = result.total;
        console.log(result);
      });
  }

  onPageChange(page) {
    this.page = page;
    this.ngOnInit();
  }
}
