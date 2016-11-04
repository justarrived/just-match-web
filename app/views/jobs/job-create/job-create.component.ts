import {Component, OnInit} from "@angular/core";
import {JobProxy} from "../../../services/job-proxy.service";
import {Job} from "../../../models/job/job";
import {HourlyPay} from "../../../models/job/job";
import {Category} from "../../../models/job/job";
import {Router} from "@angular/router";
import {grossSalaryLabel} from "../../../utils/label-util";

@Component({
    moduleId: module.id,
    templateUrl: 'job-create.component.html'
})
export class JobCreateComponent implements OnInit {
    grossSalaryLabel: Function = grossSalaryLabel;

    job: Job = new Job(null);
    hourlyPays: HourlyPay[];
    categories: Category[];
    search: any;
    errors: any = {};

    constructor(private router: Router,
                private jobProxy: JobProxy) {
    }

    ngOnInit(): void {
        this.jobProxy.getHourlyPays().then(hourlyPays => this.hourlyPays = hourlyPays);
        this.jobProxy.getCategories().then(categories => this.categories = categories);
    }

    onSubmit() {
        this.errors = {};

        this.jobProxy.saveJob(this.job.toJsonObject())
            .then(() => {
            this.router.navigate(['/jobs']);
        }).catch(errors => {
            this.errors = errors;
        });
    }
}
