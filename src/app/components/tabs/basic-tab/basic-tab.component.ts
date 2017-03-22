import {BasicTabsComponent} from '../basic-tabs/basic-tabs.component';
import {Component} from '@angular/core';
import {Input} from '@angular/core';

@Component({
  selector: 'basic-tab',
  template: `
    <div [hidden]="!active">
      <ng-content></ng-content>
    </div>
    `
})
export class BasicTabComponent {
  @Input() public tabTitle: string;
  @Input() public active: boolean;

  public constructor(
    private basicTabsComponent: BasicTabsComponent
  ) {
    basicTabsComponent.addTab(this);
  }
}
