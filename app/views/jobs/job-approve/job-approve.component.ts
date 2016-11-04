import {Component, OnInit} from "@angular/core";
import {JobProxy} from "../../../services/job-proxy.service";
import {Job} from "../../../models/job/job";
import {Router} from "@angular/router";

@Component({
    moduleId: module.id,
    templateUrl: 'job-approve.component.html'
})
export class JobApproveComponent implements OnInit {
    job: Job = new Job(null);
    errors: any = {};

    constructor(private router: Router,
                private jobProxy: JobProxy) {
    }

    ngOnInit(): void {

    }

    onApprove() {
        this.errors = {};

        this.jobProxy.saveJob(this.job.toJsonObject())
            .then(() => {
            this.router.navigate(['/jobs']);
        }).catch(errors => {
            this.errors = errors;
        });
    }
}
