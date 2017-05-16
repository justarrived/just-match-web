import {Component} from '@angular/core';
import {Input} from '@angular/core';
import {Language} from '../../../models/api-models/language/language';
import {OnDestroy} from '@angular/core';
import {OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';

@Component({
  selector: 'basic-title',
  styleUrls: ['./basic-title.component.scss'],
  template: `
    <div
      [class.bold]="fontWeight === 'bold'"
      [class.huge]="fontSize === 'huge'"
      [class.large]="fontSize === 'large'"
      [class.light]="fontWeight === 'light'"
      [class.medium]="fontSize === 'medium'"
      [class.normal]="fontWeight === 'normal'"
      [class.small]="fontSize === 'small'"
      [class.tiny]="fontSize === 'tiny'"
      [class.title]="true"
      [class.underline-border-above-black]="underlineAbove && underlineAboveColor === 'black'"
      [class.underline-border-above-blue]="underlineAbove && underlineAboveColor === 'blue'"
      [class.underline-border-above-centered]="underlineAbove && ((systemLanguage.direction === 'rtl' && rtlTextAlignment === 'center') || (systemLanguage.direction === 'ltr' && ltrTextAlignment === 'center'))"
      [class.underline-border-above-gray]="underlineAbove && underlineAboveColor === 'gray'"
      [class.underline-border-above-left]="underlineAbove && ((systemLanguage.direction === 'rtl' && rtlTextAlignment === 'left') || (systemLanguage.direction === 'ltr' && ltrTextAlignment === 'left'))"
      [class.underline-border-above-pink]="underlineAbove && underlineAboveColor === 'pink'"
      [class.underline-border-above-right]="underlineAbove && ((systemLanguage.direction === 'rtl' && rtlTextAlignment === 'right') || (systemLanguage.direction === 'ltr' && ltrTextAlignment === 'right'))"
      [class.underline-border-above-white]="underlineAbove && underlineAboveColor === 'white'"
      [class.underline-border-above]="underlineAbove"
      [class.underline-border-below-black]="underlineBelow && underlineBelowColor === 'black'"
      [class.underline-border-below-blue]="underlineBelow && underlineBelowColor === 'blue'"
      [class.underline-border-below-centered]="underlineBelow && ((systemLanguage.direction === 'rtl' && rtlTextAlignment === 'center') || (systemLanguage.direction === 'ltr' && ltrTextAlignment === 'center'))"
      [class.underline-border-below-gray]="underlineBelow && underlineBelowColor === 'gray'"
      [class.underline-border-below-left]="underlineBelow && ((systemLanguage.direction === 'rtl' && rtlTextAlignment === 'left') || (systemLanguage.direction === 'ltr' && ltrTextAlignment === 'left'))"
      [class.underline-border-below-pink]="underlineBelow && underlineBelowColor === 'pink'"
      [class.underline-border-below-right]="underlineBelow && ((systemLanguage.direction === 'rtl' && rtlTextAlignment === 'right') || (systemLanguage.direction === 'ltr' && ltrTextAlignment === 'right'))"
      [class.underline-border-below-white]="underlineBelow && underlineBelowColor === 'white'"
      [class.underline-border-below]="underlineBelow"
      [innerHTML]="text"
      [style.direction]="systemLanguage.direction"
      [style.margin-top]="marginTop"
      [style.margin-bottom]="marginBottom"
      [style.text-align]="systemLanguage.direction === 'rtl' ? rtlTextAlignment : ltrTextAlignment">
    </div>`
})
export class BasicTitleComponent implements OnInit, OnDestroy {
  @Input() public fontSize: string = 'medium'; // Should be one of 'tiny', 'small', 'medium', 'large', 'huge'.
  @Input() public fontWeight: string = 'bold'; // Should be one of 'light', 'normal', 'bold'.
  @Input() public ltrTextAlignment: string = 'left'; // Should be one of 'left', 'center', 'right'.
  @Input() public rtlTextAlignment: string = 'right'; // Should be one of 'left', 'center', 'right'.
  @Input() public text: string = '';
  @Input() public underlineAbove: boolean = false;
  @Input() public underlineAboveColor: string = 'pink'; // Should be one of 'pink', 'blue', 'gray', 'black', 'white'.
  @Input() public underlineBelow: boolean = false;
  @Input() public underlineBelowColor: string = 'pink'; // Should be one of 'pink', 'blue', 'gray', 'black', 'white'.
  @Input() public marginTop: string = '1.8rem';
  @Input() public marginBottom: string = '1rem';

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
