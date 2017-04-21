import {Component} from '@angular/core';
import {JARoutes} from '../../../routes/ja-routes/ja-routes';

@Component({
  templateUrl: './guide-page.component.html',
  styleUrls: ['./guide-page.component.scss']
})
export class GuidePageComponent {
  public JARoutes = JARoutes;

  public items =
    [
      {
        'headerTitle' : 'Test1',
        'text' : 'This is the text This is the text This is the text This is the text This is the text',
        'date' : '25 April 2017',
        'img' : 'http://sipxcom.org/wp-content/uploads/2017/03/programming_blog-400x400.jpg'
      },
      {
        'headerTitle' : 'Test2',
        'text' : 'This is the text This is the text This is the text This is the text This is the text',
        'date' : '25 April 2017',
        'img' : 'http://sipxcom.org/wp-content/uploads/2017/03/programming_blog-400x400.jpg'
      },
      {
        'headerTitle' : 'Test3',
        'text' : 'This is the text This is the text This is the text This is the text This is the text',
        'date' : '25 April 2017',
        'img' : 'http://sipxcom.org/wp-content/uploads/2017/03/programming_blog-400x400.jpg'
      }
    ];

}
