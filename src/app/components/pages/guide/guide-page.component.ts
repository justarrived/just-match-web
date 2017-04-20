import {Component} from '@angular/core';

@Component({
  templateUrl: './guide-page.component.html',
  styleUrls: ['./guide-page.component.scss']
})
export class GuidePageComponent {

  public items = [1,2,3,4,5]

  public lol() {
    console.log("ASD");
  }

}
