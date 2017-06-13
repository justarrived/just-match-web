import {BaseComponent} from '../../base.component';
import {BasicTabsComponent} from '../basic-tabs/basic-tabs.component';
import {Component} from '@angular/core';
import {Input} from '@angular/core';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
import {UserResolver} from '../../../resolvers/user/user.resolver';

@Component({
  selector: 'basic-tab',
  template: `
    <div [hidden]="!active">
      <ng-content></ng-content>
    </div>
    `
})
export class BasicTabComponent extends BaseComponent {
  @Input() public tabTitle: string;
  public active: boolean;

  public constructor(
    private basicTabsComponent: BasicTabsComponent,
    protected systemLanguagesResolver: SystemLanguagesResolver,
    protected userResolver: UserResolver,
  ) {
    super(systemLanguagesResolver, userResolver);
  }

  public onInit(): void {
    this.basicTabsComponent.addTab(this);
  }
}
