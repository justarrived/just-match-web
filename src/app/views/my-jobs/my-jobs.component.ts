import {Component} from '@angular/core';

@Component({
  templateUrl: './my-jobs.component.html',
  styleUrls: ['./my-jobs.component.scss']
})

export class MyJobsComponent {
  selectedState: string = 'active';

  setState(newState) {
    this.selectedState = newState;
  }
}
