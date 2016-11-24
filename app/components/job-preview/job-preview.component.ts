import {Component, Input, OnInit} from "@angular/core";
import {Job} from "../../models/job/job";

@Component({
  moduleId: module.id,
  selector: 'job-preview',
  templateUrl: 'job-preview.component.html',
  styleUrls: ["job-preview.component.css"]
})
export class JobPreviewComponent implements OnInit {
  @Input() job: Job;
  @Input() isPreview: boolean = false;

  constructor() {
  }

  ngOnInit(): void {

  }
}
