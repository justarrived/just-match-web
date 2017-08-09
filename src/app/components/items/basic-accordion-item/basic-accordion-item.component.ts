import {BaseComponent} from '../../base.component';
import {Component} from "@angular/core";
import {Input} from "@angular/core";
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
import {UserResolver} from '../../../resolvers/user/user.resolver';

declare var jQuery: any;

@Component({
  selector: "basic-accordion-item",
  styleUrls: ['./basic-accordion-item.component.scss'],
  template: `
    <div
      class="accordion-item-container"
      style="background: white; border-radius: 8px; margin-bottom: 10px;">
      <div
        class="title"
        style="display: flex; flex-wrap: nowrap; align-items: center; padding-left: 5px; padding-right: 5px;">
        <i *ngIf="systemLanguage.direction === 'ltr'" class="dropdown icon"></i>
        <ng-content select="[accordion-title]"></ng-content>
        <i *ngIf="systemLanguage.direction === 'rtl'" class="dropdown icon"></i>
      </div>
      <div
        class="content"
        style="padding: 0 25px 25px 25px">
        <ng-content select="[accordion-content]"></ng-content>
      </div>
    </div>`
})
export class BasicAccordionItemComponent extends BaseComponent {
  public constructor(
    protected systemLanguagesResolver: SystemLanguagesResolver,
    protected userResolver: UserResolver,
  ) {
    super(systemLanguagesResolver, userResolver);
  }
}
