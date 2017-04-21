import {Component} from '@angular/core';
import {JARoutes} from '../../../routes/ja-routes/ja-routes';

@Component({
  templateUrl: './guide-page.component.html',
  styleUrls: ['./guide-page.component.scss']
})
export class GuidePageComponent {
  public JARoutes = JARoutes;

  public items = [1,2,3,4,5];

}
