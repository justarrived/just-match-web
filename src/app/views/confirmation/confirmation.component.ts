import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent {
  private type: string;

  constructor(
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe(params => {
      this.type = params['type'];
    });
  }
}
