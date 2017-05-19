import {AfterViewInit} from "@angular/core";
import {Component} from "@angular/core";
import {ElementRef} from "@angular/core";
import {Inject} from "@angular/core";
import {Input} from "@angular/core";
import {isPlatformBrowser} from '@angular/common';
import {Language} from '../../models/api-models/language/language';
import {OnDestroy} from '@angular/core';
import {OnInit} from "@angular/core";
import {PLATFORM_ID} from "@angular/core";
import {Subscription} from 'rxjs/Subscription';
import {SystemLanguagesResolver} from '../../resolvers/system-languages/system-languages.resolver';
import {ViewChild} from "@angular/core";

declare var jQuery: any;

@Component({
  selector: "sm-accordion",
  styles: [`sm-accordion sm-accordion-item:first-child .title { border-top: none !important; }`],
  template: `
    <div
      #accordion
      class="ui accordion {{class}}">
      <ng-content></ng-content>
    </div>`
})
export class SemanticAccordionComponent {
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
  selector: "sm-accordion-item",
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
export class SemanticAccordionItemComponent implements OnInit, OnDestroy {
  @Input() class: string;

  public systemLanguage: Language;

  private systemLanguageSubscription: Subscription;

  public constructor(
    private systemLanguagesResolver: SystemLanguagesResolver
  ) {
  }

  public ngOnInit(): void {
    this.initSystemLanguage()
  }

  private initSystemLanguage(): void {
    this.systemLanguage = this.systemLanguagesResolver.getSelectedSystemLanguage();
    this.systemLanguageSubscription = this.systemLanguagesResolver.getSystemLanguageChangeEmitter().subscribe(systemLanguage => {
      this.systemLanguage = systemLanguage;
    });
  }

  public ngOnDestroy(): void {
    if (this.systemLanguageSubscription) { this.systemLanguageSubscription.unsubscribe(); }
  }
}
