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
          'url' : 'https://google.se'
        },
        {
          'header' : 'Link2',
          'text' : 'Link 2 text Link 2 text Link 2 text Link 2 text Link 2 text Link 2 text Link 2 text Link 2 text',
          'url' : 'https://gp.se'
        }
      ]
    };


}
