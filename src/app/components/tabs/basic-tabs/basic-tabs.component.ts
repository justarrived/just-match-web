import {BasicTabComponent} from '../basic-tab/basic-tab.component';
import {Component} from '@angular/core';

@Component({
  selector: 'basic-tabs',
  styleUrls: ['./basic-tabs.component.scss'],
  template: `
    <div class="ui equal width grid">
      <div
        (click)="selectTab(tab)"
        [class.active]="tab.active"
        *ngFor="let tab of tabs"
        class="column tab-container">
        <div class="ui basic center aligned segment">
          <h4>{{tab.tabTitle}}</h4>
        </div>
      </div>
    </div>

    <ng-content></ng-content>
    `
})
export class BasicTabsComponent {
  public tabs: BasicTabComponent[] = [];

  public selectTab(tab: BasicTabComponent): void {
    this.tabs.forEach((tab) => {
      tab.active = false;
    });
    tab.active = true;
  }

  public addTab(tab: BasicTabComponent): void {
    if (this.tabs.length === 0) {
      tab.active = true;
    }
    this.tabs.push(tab);
  }
}
