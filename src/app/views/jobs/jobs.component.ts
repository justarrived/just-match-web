import {Component, OnInit} from '@angular/core';
import {Job} from '../../models/job/job';
import {JobProxy} from '../../services/proxy/job-proxy.service';
import {Location} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {TranslationService} from "../../services/translation.service";
import {TranslationListener} from "../../components/translation.component";

@Component({
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss'],
  providers: [JobProxy]
})
export class JobsComponent extends TranslationListener implements OnInit {
  jobs: Job[];
  totalJobs: number = 1;
  page: number = 1;
  pageSize: number = 10;

  constructor(private jobProxy: JobProxy, private location: Location, private route: ActivatedRoute, protected translationService: TranslationService) {
    super(translationService);

    this.route.params.subscribe(params => {
      this.page = (params['page'] && parseInt(params['page'])) || 1;
    });
  }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.jobProxy.getJobs({include: 'owner,company,hourly_pay,company.company_images', 'filter[filled]': false, 'page[number]': this.page.toString()})
      .then(result => {
        this.jobs = result.data;
        this.totalJobs = result.total;
      });
  }

  onPageChange(page) {
    this.location.replaceState('/jobs/' + page);
    this.page = page;
    this.loadData();
  }
}
