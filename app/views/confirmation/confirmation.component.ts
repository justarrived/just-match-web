import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  moduleId: module.id,
  templateUrl: 'confirmation.component.html',
  styleUrls: ['confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {
  type: string;

  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.type = params['type'];
    });
  }

  ngOnInit() {
  }
}
