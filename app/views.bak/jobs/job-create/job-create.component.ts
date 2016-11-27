import {Component, OnInit} from "@angular/core";
import {JobProxy} from "../../../services/job-proxy.service";
import {Job} from "../../../models/job/job";
import {HourlyPay} from "../../../models/job/job";
import {Category} from "../../../models/job/job";
import {Router} from "@angular/router";
import {grossSalaryLabel} from "../../../utils/label-util";
import {namePropertyLabel} from "../../../utils/label-util";
import {TranslationService} from "../../../services/translation.service";

@Component({
  moduleId: module.id,
  templateUrl: 'job-create.component.html',
  styleUrls: ["job-create.component.css"],
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
  errors: any = {};

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
      this.errors = errors;
      this.isPreview = false;
    });
  }
}
