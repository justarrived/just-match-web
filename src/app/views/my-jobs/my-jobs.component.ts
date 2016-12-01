import {Component, OnInit} from "@angular/core";
import {UserManager} from "../../user-manager.service";

@Component({
  templateUrl: './my-jobs.component.html',
  styleUrls: ['./my-jobs.component.scss']
})
export class MyJobsComponent implements OnInit {
  selectedState: string = 'active';
  isCompanyUser: boolean;

  constructor(private userManager: UserManager) {
    this.isCompanyUser = userManager.isCompanyUser();
  }

  ngOnInit() {
  }

  setState(newState) {
    this.selectedState = newState;
  }
}
