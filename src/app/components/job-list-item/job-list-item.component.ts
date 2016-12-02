import {Component, Input} from "@angular/core";
import {Job} from "../../models/job/job";
import {Router} from "@angular/router";
import {UserManager} from "../../services/user-manager.service";

@Component({
  selector: 'job-list-item',
  templateUrl: './job-list-item.component.html',
  styleUrls: ['./job-list-item.component.scss']
})
export class JobListItemComponent {
  @Input() job: Job;
  isCompanyUser: boolean;

  constructor(private router: Router, private userManager: UserManager) {
    this.isCompanyUser = this.userManager.isCompanyUser();
  }

  public onListItemClick() {
    this.router.navigate(['/job', this.job.id]);
  }
}
