import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {JARoutes} from '../../routes/ja-routes';

@Component({
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent {
  private type: string;
  private JARoutes = JARoutes;

  constructor(
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe(params => {
      this.type = params['type'];
    });
  }
}
