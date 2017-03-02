import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {JARoutes} from '../../routes/ja-routes';

@Component({
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent {
  type: string;
  JARoutes = JARoutes;

  constructor(
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe(params => {
      this.type = params['type'];
    });
  }
}
