import {Component, Input, OnInit} from '@angular/core';
import {UserJob} from '../../models/user/user-job';


@Component({
  selector: 'user-job-card',
  templateUrl: './user-job-card.component.html',
  styleUrls: ['./user-job-card.component.scss']
})
export class UserJobCardComponent implements OnInit {
  @Input() userJob: UserJob;

  constructor(
  ) {
  }

  ngOnInit() {
  }

}
