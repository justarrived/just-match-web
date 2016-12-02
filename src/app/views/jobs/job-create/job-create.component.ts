import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {JobProxy} from "../../../services/proxy/job-proxy.service";
import {Job} from "../../../models/job/job";
import {HourlyPay} from "../../../models/job/job";
import {Category} from "../../../models/job/job";
import {grossSalaryLabel} from "../../../utils/label-util";
import {namePropertyLabel} from "../../../utils/label-util";
import {TranslationService} from "../../../services/translation.service";

@Component({
  templateUrl: './job-create.component.html',
  styleUrls: ['./job-create.component.scss'],
  providers: [JobProxy]
})
export class JobCreateComponent implements OnInit {
  grossSalaryLabel: Function = grossSalaryLabel;
  namePropertyLabel: Function = namePropertyLabel;

  job: Job = new Job(null);
  hourlyPays: HourlyPay[];
  categories: Category[];

  isPreview: boolean = false;
  search: any;
  errors: Object = {};

  constructor(private router: Router,
              private jobProxy: JobProxy,
              private translationService: TranslationService) {
  }

  ngOnInit(): void {
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
