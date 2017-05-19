import {Component} from '@angular/core';
import {Input} from '@angular/core';
import {Language} from '../../../models/api-models/language/language';
import {OnDestroy} from '@angular/core';
import {OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';

@Component({
  selector: 'basic-text',
  styleUrls: ['./basic-text.component.scss'],
  template: `
    <div
      [class.bold]="fontWeight === 'bold'"
      [class.large]="fontSize === 'large'"
      [class.light]="fontWeight === 'light'"
      [class.medium]="fontSize === 'medium'"
      [class.normal]="fontWeight === 'normal'"
      [class.small]="fontSize === 'small'"
      [class.text]="true"
      [class.gray]="color === 'gray'"
      [class.black]="color === 'black'"
      [class.white]="color === 'white'"
      [class.pink]="color === 'pink'"
      [class.one-line-ellipsis]="oneLineEllipsis"
      [class.uppercase]="uppercase"
      [class.italic]="italic"
      [class.maximum-2-lines-ellipsis]="maxiumLinesEllipsis === 2"
      [class.maximum-3-lines-ellipsis]="maxiumLinesEllipsis === 3"
      [class.maximum-4-lines-ellipsis]="maxiumLinesEllipsis === 4"
      [class.maximum-5-lines-ellipsis]="maxiumLinesEllipsis === 5"
      [class.maximum-6-lines-ellipsis]="maxiumLinesEllipsis === 6"
      [class.maximum-7-lines-ellipsis]="maxiumLinesEllipsis === 7"
      [class.maximum-8-lines-ellipsis]="maxiumLinesEllipsis === 8"
      [class.maximum-9-lines-ellipsis]="maxiumLinesEllipsis === 9"
      [class.maximum-10-lines-ellipsis]="maxiumLinesEllipsis === 10"
      [class.mobile-center]="systemLanguage.direction === 'rtl' && textAlignmentRtlMobile === 'center' || systemLanguage.direction === 'ltr' && textAlignmentLtrMobile === 'center'"
      [class.mobile-left]="systemLanguage.direction === 'rtl' && textAlignmentRtlMobile === 'left' || systemLanguage.direction === 'ltr' && textAlignmentLtrMobile === 'left'"
      [class.mobile-right]="systemLanguage.direction === 'rtl' && textAlignmentRtlMobile === 'right' || systemLanguage.direction === 'ltr' && textAlignmentLtrMobile === 'right'"
      [class.center]="systemLanguage.direction === 'rtl' && textAlignmentRtl === 'center' || systemLanguage.direction === 'ltr' && textAlignmentLtr === 'center'"
      [class.left]="systemLanguage.direction === 'rtl' && textAlignmentRtl === 'left' || systemLanguage.direction === 'ltr' && textAlignmentLtr === 'left'"
      [class.right]="systemLanguage.direction === 'rtl' && textAlignmentRtl === 'right' || systemLanguage.direction === 'ltr' && textAlignmentLtr === 'right'"
      [class.tablet-center]="systemLanguage.direction === 'rtl' && textAlignmentRtlTablet === 'center' || systemLanguage.direction === 'ltr' && textAlignmentLtrTablet === 'center'"
      [class.tablet-left]="systemLanguage.direction === 'rtl' && textAlignmentRtlTablet === 'left' || systemLanguage.direction === 'ltr' && textAlignmentLtrTablet === 'left'"
      [class.tablet-right]="systemLanguage.direction === 'rtl' && textAlignmentRtlTablet === 'right' || systemLanguage.direction === 'ltr' && textAlignmentLtrTablet === 'right'"
      [innerHTML]="text || ''">
    </div>
    `
})
export class BasicTextComponent implements OnInit, OnDestroy {
  @Input() public alwaysLtrText: boolean = false;
  @Input() public alwaysRtlText: boolean = false;
  @Input() public color: string; // Should be one of 'pink', 'black', 'gray', 'white'.
  @Input() public oneLineEllipsis: boolean = false;
  @Input() public maxiumLinesEllipsis: number; // Should be one of undefined or 2-10
  @Input() public display: string = 'block';
  @Input() public fontSize: string = 'medium'; // Should be one of 'small', 'medium', 'large'.
  @Input() public fontWeight: string = 'normal'; // Should be one of 'light', 'normal', 'bold'.
  @Input() public italic: boolean = false;
  @Input() public marginBottom: string = '1rem';
  @Input() public marginTop: string = '0';
  @Input() public text: string = '';
  @Input() public uppercase: boolean = false;
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
