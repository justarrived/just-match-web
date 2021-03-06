import {BaseComponent} from '../../base.component';
import {Component} from '@angular/core';
import {Input} from '@angular/core';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
import {UserResolver} from '../../../resolvers/user/user.resolver';

@Component({
  selector: 'basic-title-text',
  styleUrls: ['./basic-title-text.component.scss'],
  template: `
    <div
      [class.arabic-font]="systemLanguage.direction === 'rtl'"
      [class.bold]="fontWeight === 'bold'"
      [class.center]="systemLanguage.direction === 'rtl' && textAlignmentRtl === 'center' || systemLanguage.direction === 'ltr' && textAlignmentLtr === 'center'"
      [class.huge]="fontSize === 'huge'"
      [class.large]="fontSize === 'large'"
      [class.left]="systemLanguage.direction === 'rtl' && textAlignmentRtl === 'left' || systemLanguage.direction === 'ltr' && textAlignmentLtr === 'left'"
      [class.light]="fontWeight === 'light'"
      [class.medium]="fontSize === 'medium'"
      [class.mobile-center]="systemLanguage.direction === 'rtl' && textAlignmentRtlMobile === 'center' || systemLanguage.direction === 'ltr' && textAlignmentLtrMobile === 'center'"
      [class.mobile-left]="systemLanguage.direction === 'rtl' && textAlignmentRtlMobile === 'left' || systemLanguage.direction === 'ltr' && textAlignmentLtrMobile === 'left'"
      [class.mobile-right]="systemLanguage.direction === 'rtl' && textAlignmentRtlMobile === 'right' || systemLanguage.direction === 'ltr' && textAlignmentLtrMobile === 'right'"
      [class.normal]="fontWeight === 'normal'"
      [class.right]="systemLanguage.direction === 'rtl' && textAlignmentRtl === 'right' || systemLanguage.direction === 'ltr' && textAlignmentLtr === 'right'"
      [class.small]="fontSize === 'small'"
      [class.tablet-center]="systemLanguage.direction === 'rtl' && textAlignmentRtlTablet === 'center' || systemLanguage.direction === 'ltr' && textAlignmentLtrTablet === 'center'"
      [class.tablet-left]="systemLanguage.direction === 'rtl' && textAlignmentRtlTablet === 'left' || systemLanguage.direction === 'ltr' && textAlignmentLtrTablet === 'left'"
      [class.tablet-right]="systemLanguage.direction === 'rtl' && textAlignmentRtlTablet === 'right' || systemLanguage.direction === 'ltr' && textAlignmentLtrTablet === 'right'"
      [class.tiny]="fontSize === 'tiny'"
      [class.gray]="color === 'gray'"
      [class.green]="color === 'green'"
      [class.black]="color === 'black'"
      [class.white]="color === 'white'"
      [class.pink]="color === 'pink'"
      [class.one-line-ellipsis]="oneLineEllipsis"
      [class.title]="true"
      [class.uppercase]="uppercase"
      [class.italic]="italic"
      [class.underline-border-above-black]="underlineAbove && underlineAboveColor === 'black'"
      [class.underline-border-above-blue]="underlineAbove && underlineAboveColor === 'blue'"
      [class.underline-border-above-center]="underlineAbove && (systemLanguage.direction === 'rtl' && underlineAboveRtlAlignment === 'center' || systemLanguage.direction === 'ltr' && underlineAboveLtrAlignment === 'center')"
      [class.underline-border-above-gray]="underlineAbove && underlineAboveColor === 'gray'"
      [class.underline-border-above-left]="underlineAbove && (systemLanguage.direction === 'rtl' && underlineAboveRtlAlignment === 'left' || systemLanguage.direction === 'ltr' && underlineAboveLtrAlignment === 'left')"
      [class.underline-border-above-mobile-center]="underlineAbove && (systemLanguage.direction === 'rtl' && underlineAboveRtlAlignmentMobile === 'center' || systemLanguage.direction === 'ltr' && underlineAboveLtrAlignmentMobile === 'center')"
      [class.underline-border-above-mobile-left]="underlineAbove && (systemLanguage.direction === 'rtl' && underlineAboveRtlAlignmentMobile === 'left' || systemLanguage.direction === 'ltr' && underlineAboveLtrAlignmentMobile === 'left')"
      [class.underline-border-above-mobile-right]="underlineAbove && (systemLanguage.direction === 'rtl' && underlineAboveRtlAlignmentMobile === 'right' || systemLanguage.direction === 'ltr' && underlineAboveLtrAlignmentMobile === 'right')"
      [class.underline-border-above-pink]="underlineAbove && underlineAboveColor === 'pink'"
      [class.underline-border-above-right]="underlineAbove && (systemLanguage.direction === 'rtl' && underlineAboveRtlAlignment === 'right' || systemLanguage.direction === 'ltr' && underlineAboveLtrAlignment === 'right')"
      [class.underline-border-above-tablet-center]="underlineAbove && (systemLanguage.direction === 'rtl' && underlineAboveRtlAlignmentTablet === 'center' || systemLanguage.direction === 'ltr' && underlineAboveLtrAlignmentTablet === 'center')"
      [class.underline-border-above-tablet-left]="underlineAbove && (systemLanguage.direction === 'rtl' && underlineAboveRtlAlignmentTablet === 'left' || systemLanguage.direction === 'ltr' && underlineAboveLtrAlignmentTablet === 'left')"
      [class.underline-border-above-tablet-right]="underlineAbove && (systemLanguage.direction === 'rtl' && underlineAboveRtlAlignmentTablet === 'right' || systemLanguage.direction === 'ltr' && underlineAboveLtrAlignmentTablet === 'right')"
      [class.underline-border-above-white]="underlineAbove && underlineAboveColor === 'white'"
      [class.underline-border-above]="underlineAbove"
      [class.underline-border-below-black]="underlineBelow && underlineBelowColor === 'black'"
      [class.underline-border-below-blue]="underlineBelow && underlineBelowColor === 'blue'"
      [class.underline-border-below-center]="underlineBelow && (systemLanguage.direction === 'rtl' && underlineBelowRtlAlignment === 'center' || systemLanguage.direction === 'ltr' && underlineBelowLtrAlignment === 'center')"
      [class.underline-border-below-gray]="underlineBelow && underlineBelowColor === 'gray'"
      [class.underline-border-below-left]="underlineBelow && (systemLanguage.direction === 'rtl' && underlineBelowRtlAlignment === 'left' || systemLanguage.direction === 'ltr' && underlineBelowLtrAlignment === 'left')"
      [class.underline-border-below-mobile-center]="underlineBelow && (systemLanguage.direction === 'rtl' && underlineBelowRtlAlignmentMobile === 'center' || systemLanguage.direction === 'ltr' && underlineBelowLtrAlignmentMobile === 'center')"
      [class.underline-border-below-mobile-left]="underlineBelow && (systemLanguage.direction === 'rtl' && underlineBelowRtlAlignmentMobile === 'left' || systemLanguage.direction === 'ltr' && underlineBelowLtrAlignmentMobile === 'left')"
      [class.underline-border-below-mobile-right]="underlineBelow && (systemLanguage.direction === 'rtl' && underlineBelowRtlAlignmentMobile === 'right' || systemLanguage.direction === 'ltr' && underlineBelowLtrAlignmentMobile === 'right')"
      [class.underline-border-below-pink]="underlineBelow && underlineBelowColor === 'pink'"
      [class.underline-border-below-right]="underlineBelow && (systemLanguage.direction === 'rtl' && underlineBelowRtlAlignment === 'right' || systemLanguage.direction === 'ltr' && underlineBelowLtrAlignment === 'right')"
      [class.underline-border-below-tablet-center]="underlineBelow && (systemLanguage.direction === 'rtl' && underlineBelowRtlAlignmentTablet === 'center' || systemLanguage.direction === 'ltr' && underlineBelowLtrAlignmentTablet === 'center')"
      [class.underline-border-below-tablet-left]="underlineBelow && (systemLanguage.direction === 'rtl' && underlineBelowRtlAlignmentTablet === 'left' || systemLanguage.direction === 'ltr' && underlineBelowLtrAlignmentTablet === 'left')"
      [class.underline-border-below-tablet-right]="underlineBelow && (systemLanguage.direction === 'rtl' && underlineBelowRtlAlignmentTablet === 'right' || systemLanguage.direction === 'ltr' && underlineBelowLtrAlignmentTablet === 'right')"
      [class.underline-border-below-white]="underlineBelow && underlineBelowColor === 'white'"
      [class.underline-border-below]="underlineBelow"
      [style.direction]="alwaysLtrText ? 'ltr' : alwaysRtlText ? 'rtl' : systemLanguage.direction"
      [style.display]="display"
      [style.margin-bottom]="marginBottom"
      [style.margin-top]="marginTop"
      [style.margin-top]="marginTop"
      [style.margin-left]="marginLeft"
      [style.margin-right]="marginRight">
      <i
        *ngIf="iconLeft"
        class="{{iconLeft}} icon">
      </i>
      <div
        [class.maximum-2-lines-ellipsis]="maxiumLinesEllipsis === 2"
        [class.maximum-3-lines-ellipsis]="maxiumLinesEllipsis === 3"
        [class.maximum-4-lines-ellipsis]="maxiumLinesEllipsis === 4"
        [class.maximum-5-lines-ellipsis]="maxiumLinesEllipsis === 5"
        [class.maximum-6-lines-ellipsis]="maxiumLinesEllipsis === 6"
        [class.maximum-7-lines-ellipsis]="maxiumLinesEllipsis === 7"
        [class.maximum-8-lines-ellipsis]="maxiumLinesEllipsis === 8"
        [class.maximum-9-lines-ellipsis]="maxiumLinesEllipsis === 9"
        [class.maximum-10-lines-ellipsis]="maxiumLinesEllipsis === 10"
        [style.display]="'inline'">
        {{text}}
      </div>
      <i
        *ngIf="iconRight"
        class="{{iconRight}} icon">
      </i>
    </div>`
})
export class BasicTitleTextComponent extends BaseComponent {
  @Input() public alwaysLtrText: boolean = false;
  @Input() public alwaysRtlText: boolean = false;
  @Input() public color: string; // Should be one of 'pink', 'black', 'gray', 'white', 'green'.
  @Input() public display: string = 'block';
  @Input() public oneLineEllipsis: boolean = false;
  @Input() public italic: boolean = false;
  @Input() public maxiumLinesEllipsis: number; // Should be one of undefined or 2-10
  @Input() public fontSize: string = 'medium'; // Should be one of 'tiny', 'small', 'medium', 'large', 'huge'.
  @Input() public fontWeight: string = 'bold'; // Should be one of 'light', 'normal', 'bold'.
  @Input() public iconLeft: string;
  @Input() public iconRight: string;
  @Input() public marginBottom: string = '1rem';
  @Input() public marginLeft: string = '0';
  @Input() public marginRight: string = '0';
  @Input() public marginTop: string = '1.8rem';
  @Input() public text: string;
  @Input() public uppercase: boolean = false;
  @Input() public textAlignmentLtr: string = 'left'; // Should be one of 'left', 'center', 'right'.
  @Input() public textAlignmentLtrMobile: string; // Should be one of undefined, 'left', 'center', 'right'.
  @Input() public textAlignmentLtrTablet: string; // Should be one of undefined, 'left', 'center', 'right'.
  @Input() public textAlignmentRtl: string = 'right'; // Should be one of 'left', 'center', 'right'.
  @Input() public textAlignmentRtlMobile: string; // Should be one of undefined, 'left', 'center', 'right'.
  @Input() public textAlignmentRtlTablet: string; // Should be one of undefined, 'left', 'center', 'right'.
  @Input() public underlineAbove: boolean = false;
  @Input() public underlineAboveColor: string = 'pink'; // Should be one of 'pink', 'blue', 'gray', 'black', 'white'.
  @Input() public underlineAboveLtrAlignment: string = 'left'; // Should be one of 'left', 'center', 'right'.
  @Input() public underlineAboveLtrAlignmentMobile: string; // Should be one of undefined, 'left', 'center', 'right'.
  @Input() public underlineAboveLtrAlignmentTablet: string; // Should be one of undefined, 'left', 'center', 'right'.
  @Input() public underlineAboveRtlAlignment: string = 'right'; // Should be one of 'left', 'center', 'right'.
  @Input() public underlineAboveRtlAlignmentMobile: string; // Should be one of undefined, 'left', 'center', 'right'.
  @Input() public underlineAboveRtlAlignmentTablet: string; // Should be one of undefined, 'left', 'center', 'right'.
  @Input() public underlineBelow: boolean = false;
  @Input() public underlineBelowColor: string = 'pink'; // Should be one of 'pink', 'blue', 'gray', 'black', 'white'.
  @Input() public underlineBelowLtrAlignment: string = 'left'; // Should be one of 'left', 'center', 'right'.
  @Input() public underlineBelowLtrAlignmentMobile: string; // Should be one of undefined, 'left', 'center', 'right'.
  @Input() public underlineBelowLtrAlignmentTablet: string; // Should be one of undefined, 'left', 'center', 'right'.
  @Input() public underlineBelowRtlAlignment: string = 'right'; // Should be one of 'left', 'center', 'right'.
  @Input() public underlineBelowRtlAlignmentMobile: string; // Should be one of undefined, 'left', 'center', 'right'.
  @Input() public underlineBelowRtlAlignmentTablet: string; // Should be one of undefined, 'left', 'center', 'right'.

  public constructor(
    protected systemLanguagesResolver: SystemLanguagesResolver,
    protected userResolver: UserResolver,
  ) {
    super(systemLanguagesResolver, userResolver);
  }
}
