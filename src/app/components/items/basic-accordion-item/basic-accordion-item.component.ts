import {BaseComponent} from '../../base.component';
import {Component} from "@angular/core";
import {Input} from "@angular/core";
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
import {UserResolver} from '../../../resolvers/user/user.resolver';

declare var jQuery: any;

@Component({
  selector: "basic-accordion-item",
  template: `
    <div
      class="{{class}} title"
      style="display: flex; flex-wrap: nowrap; align-items: center;">
      <i *ngIf="systemLanguage.direction === 'ltr'" class="dropdown icon"></i>
      <ng-content select="[accordion-title]"></ng-content>
      <i *ngIf="systemLanguage.direction === 'rtl'" class="dropdown icon"></i>
    </div>
    <div class="{{class}} content">
      <ng-content select="[accordion-content]"></ng-content>
    </div>`
})
export class BasicAccordionItemComponent extends BaseComponent {
  @Input() class: string;

  public constructor(
    protected systemLanguagesResolver: SystemLanguagesResolver,
    protected userResolver: UserResolver,
  ) {
    super(systemLanguagesResolver, userResolver);
  }
}
