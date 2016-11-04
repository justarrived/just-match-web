import {Component, OnInit, Input} from '@angular/core';
import {Job} from "../../models/job/job";

@Component({
  moduleId: module.id,
  selector: 'job-list-item',
  templateUrl: 'job-list-item.component.html',
  styleUrls: ['job-list-item.component.css']
})
export class JobListItemComponent implements OnInit {
  @Input() job: Job;

  constructor() {
  }

  ngOnInit() {
  }

  public onListItemClick() {
    console.log('click');
  }

}
