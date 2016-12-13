import {Component} from '@angular/core';
import {UserManager} from '../../services/user-manager.service';

@Component({
  templateUrl: './my-jobs.component.html',
  styleUrls: ['./my-jobs.component.scss']
})
export class MyJobsComponent {
  selectedState: string = 'active';
  isCompanyUser: boolean;

  constructor(private userManager: UserManager) {
    this.isCompanyUser = userManager.isCompanyUser();
  }

  setState(newState) {
    this.selectedState = newState;
  }
}
