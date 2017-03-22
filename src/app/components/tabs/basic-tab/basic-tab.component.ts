import {BasicTabsComponent} from '../basic-tabs/basic-tabs.component';
import {Component} from '@angular/core';
import {Input} from '@angular/core';
import {OnInit} from '@angular/core';

@Component({
  selector: 'basic-tab',
  template: `
    <div [hidden]="!active">
      <ng-content></ng-content>
    </div>
    `
})
export class BasicTabComponent implements OnInit {
  @Input() public tabTitle: string;
  public active: boolean;

  public constructor(
    private basicTabsComponent: BasicTabsComponent
  ) {
  }

  public ngOnInit(): void {
    this.basicTabsComponent.addTab(this);
  }
}
