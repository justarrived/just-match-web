import {Component, Input} from "@angular/core";
import {Job} from "../../models/job/job";
import {Router} from "@angular/router";
import {UserManager} from "../../user-manager.service";

@Component({
  selector: 'my-jobs-item',
  templateUrl: './my-jobs-item.component.html',
  styleUrls: ['./my-jobs-item.component.scss']
})
export class MyJobsItemComponent {
  @Input() job: Job;
  @Input() section: string;
  isCompanyUser: boolean;

  constructor(private router: Router, private userManager: UserManager) {
    this.isCompanyUser = this.userManager.isCompanyUser();
  }

  public onListItemClick() {
    this.router.navigate(['/job', this.job.id]);
  }
}
