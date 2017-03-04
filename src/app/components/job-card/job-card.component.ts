import {Component, Input, OnInit} from '@angular/core';
import {Job} from '../../models/job/job';


@Component({
  selector: 'job-card',
  templateUrl: './job-card.component.html',
  styleUrls: ['./job-card.component.scss']
})
export class JobCardComponent implements OnInit {
  @Input() job: Job;

  constructor(
  ) {
  }

  ngOnInit() {
  }

}
