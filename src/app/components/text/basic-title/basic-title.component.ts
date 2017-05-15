import {Component} from '@angular/core';
import {Input} from '@angular/core';
import {Language} from '../../../models/api-models/language/language';
import {OnDestroy} from '@angular/core';
import {OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';

@Component({
  selector: 'basic-title',
  template: `
    <h3
      [style.direction]="systemLanguage.direction"
      [style.text-align]="systemLanguage.direction === 'rtl' ? rtlTextAlignment : ltrTextAlignment"
      [innerHTML]="text"
      [class.underline-border-below]="underlineBelow'"
      [class.underline-border-above]="underlineAbove'"
      >
    </h3>`
})
export class BasicTitleComponent implements OnInit, OnDestroy {
  @Input() public text: string = '';
  @Input() public ltrTextAlignment: string = 'left';
  @Input() public rtlTextAlignment: string = 'right';
  @Input() public underlineBelow: boolean = false;
  @Input() public underlineAbove: boolean = false;
  @Input() public underlineBelowColor: string = 'pink';
  @Input() public underlineAboveColor: string = 'pink';

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
