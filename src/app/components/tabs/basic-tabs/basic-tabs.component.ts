import {BaseComponent} from '../../base.component';
import {BasicTabComponent} from '../basic-tab/basic-tab.component';
import {Component} from '@angular/core';
import {Input} from '@angular/core';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
import {UserResolver} from '../../../resolvers/user/user.resolver';

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
          <basic-title-text
            [text]="tab.tabTitle"
            fontSize="small"
            marginBottom="0"
            marginTop="0"
            textAlignmentLtr="center"
            textAlignmentRtl="center">
          </basic-title-text>
        </div>
      </div>
    </div>

    <ng-content></ng-content>
    `
})
export class BasicTabsComponent extends BaseComponent {
  public tabs: BasicTabComponent[] = [];

  public constructor(
    protected systemLanguagesResolver: SystemLanguagesResolver,
    protected userResolver: UserResolver,
  ) {
    super(systemLanguagesResolver, userResolver);
  }

  public selectTab(tab: BasicTabComponent): void {
    for (let tab of this.tabs) {
      tab.active = false;
    }
    tab.active = true;
  }

  public addTab(tab: BasicTabComponent): void {
    if (this.tabs.length === 0) {
      tab.active = true;
    }
    this.tabs.push(tab);
  }
}
