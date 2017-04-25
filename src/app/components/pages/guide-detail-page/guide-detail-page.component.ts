import {Component} from '@angular/core';

@Component({
  templateUrl: './guide-detail-page.component.html',
  styleUrls: ['./guide-detail-page.component.scss']
})
export class GuideDetailPageComponent {

  public guideDetailPost =
    {
      'header' : 'Detail header 1',
      'text' : 'Text text text text text text text text',
      'date' : '27 April 2017',
      'links' : [
        {
          'header' : 'Link1',
          'text' : 'Link 1 text Link 1 text Link 1 text Link 1 text Link 1 text Link 1 text Link 1 text Link 1 text',
          'img' : 'http://sipxcom.org/wp-content/uploads/2017/03/programming_blog-400x400.jpg',
          'url' : 'https://google.se'
        },
        {
          'header' : 'Link2',
          'text' : 'Link 2 text Link 2 text Link 2 text Link 2 text Link 2 text Link 2 text Link 2 text Link 2 text',
          'img' : 'http://sipxcom.org/wp-content/uploads/2017/03/programming_blog-400x400.jpg',
          'url' : 'https://gp.se'
        }
      ]
    };


}
