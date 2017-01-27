import {Component} from '@angular/core';

@Component({
  templateUrl: './my-jobs.component.html',
  styleUrls: ['./my-jobs.component.scss']
})

export class MyJobsComponent {
  private selectedState: string = 'active';

  constructor(
  ) {
  }

  private setState(newState) {
    this.selectedState = newState;
  }
}
