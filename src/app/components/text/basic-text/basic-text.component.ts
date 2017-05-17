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
      [innerHTML]="text"
      [style.direction]="systemLanguage.direction"
      [style.display]="display"
      [style.margin-bottom]="marginBottom"
      [style.margin-top]="marginTop"
      [style.text-align]="systemLanguage.direction === 'rtl' ? textAlignmentRtl : textAlignmentLtr">
    </div>
    `
})
export class BasicTextComponent implements OnInit, OnDestroy {
  @Input() public display: string = 'block';
  @Input() public fontSize: string = 'medium'; // Should be one of 'small', 'medium', 'large'.
  @Input() public fontWeight: string = 'normal'; // Should be one of 'light', 'normal', 'bold'.
  @Input() public marginBottom: string = '1rem';
  @Input() public marginTop: string = '0';
  @Input() public text: string = '';
  @Input() public textAlignmentLtr: string = 'left';
  @Input() public textAlignmentRtl: string = 'right';

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
