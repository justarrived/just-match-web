import {Component} from '@angular/core';
import {Input} from '@angular/core';
import {Language} from '../../../models/api-models/language/language';
import {OnDestroy} from '@angular/core';
import {OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';

@Component({
  selector: 'basic-link',
  styleUrls: ['./basic-link.component.scss'],
  template: `
    <a
      [attr.data-hover]="text"
      [href]="href"
      [class.pink]="fontSize === 'small'"
      [innerHTML]="text"
      [class.hover-black]="hoverColor === 'black'"
      [class.hover-gray]="hoverColor === 'gray'"
      [class.hover-white]="hoverColor === 'white'"
      [class.hover-pink]="hoverColor === 'pink'"
      [class.cl-effect-1]="'true'"
      [class.gray]="color === 'gray'"
      [class.black]="color === 'black'"
      [class.white]="color === 'white'"
      [class.pink]="color === 'pink'"
      [class.bold]="fontWeight === 'bold'"
      [class.large]="fontSize === 'large'"
      [class.light]="fontWeight === 'light'"
      [class.medium]="fontSize === 'medium'"
      [class.mobile-center]="systemLanguage.direction === 'rtl' && textAlignmentRtlMobile === 'center' || systemLanguage.direction === 'ltr' && textAlignmentLtrMobile === 'center'"
      [class.mobile-left]="systemLanguage.direction === 'rtl' && textAlignmentRtlMobile === 'left' || systemLanguage.direction === 'ltr' && textAlignmentLtrMobile === 'left'"
      [class.mobile-right]="systemLanguage.direction === 'rtl' && textAlignmentRtlMobile === 'right' || systemLanguage.direction === 'ltr' && textAlignmentLtrMobile === 'right'"
      [class.center]="systemLanguage.direction === 'rtl' && textAlignmentRtl === 'center' || systemLanguage.direction === 'ltr' && textAlignmentLtr === 'center'"
      [class.left]="systemLanguage.direction === 'rtl' && textAlignmentRtl === 'left' || systemLanguage.direction === 'ltr' && textAlignmentLtr === 'left'"
      [class.right]="systemLanguage.direction === 'rtl' && textAlignmentRtl === 'right' || systemLanguage.direction === 'ltr' && textAlignmentLtr === 'right'"
      [class.tablet-center]="systemLanguage.direction === 'rtl' && textAlignmentRtlTablet === 'center' || systemLanguage.direction === 'ltr' && textAlignmentLtrTablet === 'center'"
      [class.tablet-left]="systemLanguage.direction === 'rtl' && textAlignmentRtlTablet === 'left' || systemLanguage.direction === 'ltr' && textAlignmentLtrTablet === 'left'"
      [class.tablet-right]="systemLanguage.direction === 'rtl' && textAlignmentRtlTablet === 'right' || systemLanguage.direction === 'ltr' && textAlignmentLtrTablet === 'right'"
      [class.normal]="fontWeight === 'normal'"
      [class.small]="fontSize === 'small'"
      [class.link]="true"
      [routerLink]="routerLink"
      [style.direction]="systemLanguage.direction"
      [style.display]="display"
      [style.margin-bottom]="marginBottom"
      [style.margin-top]="marginTop"
      [style.text-decoration]="underline ? 'underline' : 'none'">
    </a>
    `
})
export class BasicLinkComponent implements OnInit, OnDestroy {
  @Input() public routerLink: string;
  @Input() public href: string;
  @Input() public underline: boolean = false;
  @Input() public hoverColor: string = 'pink';
  @Input() public color: string = 'black';
  @Input() public display: string = 'block';
  @Input() public fontSize: string = 'medium'; // Should be one of 'small', 'medium', 'large'.
  @Input() public fontWeight: string = 'normal'; // Should be one of 'light', 'normal', 'bold'.
  @Input() public marginBottom: string = '1rem';
  @Input() public marginTop: string = '1rem';
  @Input() public text: string = '';
  @Input() public textAlignmentLtr: string = 'left'; // Should be one of 'left', 'center', 'right'.
  @Input() public textAlignmentLtrMobile: string; // Should be one of undefined, 'left', 'center', 'right'.
  @Input() public textAlignmentLtrTablet: string; // Should be one of undefined, 'left', 'center', 'right'.
  @Input() public textAlignmentRtl: string = 'right'; // Should be one of 'left', 'center', 'right'.
  @Input() public textAlignmentRtlMobile: string; // Should be one of undefined, 'left', 'center', 'right'.
  @Input() public textAlignmentRtlTablet: string; // Should be one of undefined, 'left', 'center', 'right'.

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
