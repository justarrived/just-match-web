import {AfterViewInit} from "@angular/core";
import {ChangeDetectionStrategy} from "@angular/core";
import {Component} from "@angular/core";
import {ElementRef} from "@angular/core";
import {Inject} from "@angular/core";
import {Input} from "@angular/core";
import {isPlatformBrowser} from '@angular/common';
import {OnInit} from "@angular/core";
import {PLATFORM_ID} from "@angular/core";
import {ViewChild} from "@angular/core";

declare var jQuery: any;

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: "sm-accordion",
  styles: [`sm-accordion sm-accordion-item:first-child .title { border-top: none !important; }`],
  template: `
    <div
      #accordion
      class="ui accordion {{class}}">
      <ng-content></ng-content>
    </div>`
})
export class SemanticAccordionComponent implements AfterViewInit {
  @Input() class: string;
  @Input() options: string;
  @ViewChild("accordion") accordion: ElementRef;

  public constructor(
    @Inject(PLATFORM_ID) private readonly platformId: any
  ) {
  }

  public ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      jQuery(this.accordion.nativeElement).accordion(this.options || {});
    }
  }
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: "sm-accordion-item",
  template: `
    <div
      class="{{class}} title"
      style="display: flex; flex-wrap: nowrap; align-items: center;">
      <i class="dropdown icon"></i>
      <ng-content select="[accordion-title]"></ng-content>
    </div>
    <div class="{{class}} content">
      <ng-content select="[accordion-content]"></ng-content>
    </div>`
})
export class SemanticAccordionItemComponent {
  @Input() class: string;
}
