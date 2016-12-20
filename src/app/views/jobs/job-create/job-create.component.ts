import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {JobProxy} from '../../../services/proxy/job-proxy.service';
import {Job} from '../../../models/job/job';
import {HourlyPay} from '../../../models/job/job';
import {Category} from '../../../models/job/job';
import {grossSalaryLabel} from '../../../utils/label-util';
import {namePropertyLabel} from '../../../utils/label-util';
import {TranslationService} from '../../../services/translation.service';
import {TranslationListener} from '../../../components/translation.component';

@Component({
  templateUrl: './job-create.component.html',
  styleUrls: ['./job-create.component.scss'],
  providers: [JobProxy]
})
export class JobCreateComponent extends TranslationListener implements OnInit {
  grossSalaryLabel: Function = grossSalaryLabel;
  namePropertyLabel: Function = namePropertyLabel;

  job: Job = new Job(null);
  hourlyPays: HourlyPay[];
  categories: Category[];

  isPreview: boolean = false;
  errors: Object = {};

  constructor(private router: Router,
              private jobProxy: JobProxy,
              protected translationService: TranslationService) {
    super(translationService);
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.jobProxy.getHourlyPays().then(hourlyPays => this.hourlyPays = hourlyPays);
    this.jobProxy.getCategories().then(categories => this.categories = categories);
  }

  setPreviewMode() {
    this.isPreview = true;
  }

  exitPreviewMode() {
    this.isPreview = false;
  }

  saveJob() {
    this.errors = {};

    this.job.languageId = this.translationService.getSelectedLanguage().id;

    this.jobProxy.saveJob(this.job.toJsonObject())
        .then(() => {
          this.router.navigate(['/jobs']);
        }).catch(errors => {
      this.errors = errors.details;
      this.isPreview = false;
    });
  }
}
