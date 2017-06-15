import {BaseComponent} from '../../base.component';
import {Component} from "@angular/core";
import {ElementRef} from "@angular/core";
import {Inject} from "@angular/core";
import {Input} from "@angular/core";
import {isPlatformBrowser} from '@angular/common';
import {PLATFORM_ID} from "@angular/core";
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
import {UserResolver} from '../../../resolvers/user/user.resolver';
import {ViewChild} from "@angular/core";

declare var jQuery: any;

@Component({
  selector: "basic-accordion",
  styles: [`basic-accordion basic-accordion-item:first-child .title { border-top: none !important; }`],
  template: `
    <div
      #accordion
      class="ui accordion {{class}}">
      <ng-content></ng-content>
    </div>`
})
export class BasicAccordionComponent extends BaseComponent {
  @Input() class: string;
  @Input() options: string;
  @ViewChild("accordion") accordion: ElementRef;

  public constructor(
    @Inject(PLATFORM_ID) private readonly platformId: any,
    protected systemLanguagesResolver: SystemLanguagesResolver,
    protected userResolver: UserResolver,
  ) {
    super(systemLanguagesResolver, userResolver);
  }

  public afterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      jQuery(this.accordion.nativeElement).accordion(this.options || {});
    }
  }
}
