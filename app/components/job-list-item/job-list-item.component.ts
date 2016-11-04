import {Component, OnInit, Input} from '@angular/core';
import {Job} from "../../models/job/job";

@Component({
  moduleId: module.id,
  selector: 'job-list-item',
  templateUrl: 'job-list-item.component.html',
  styleUrls: ['job-list-item.component.css']
})
export class JobListItemComponent {
  @Input() job: Job;

  constructor() {
  }

  public onListItemClick() {
    console.log('click'); //TODO: Redirect when "JS-9: Implement jobs details page" is ready
  }
}
