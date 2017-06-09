import {ApiErrors} from '../../../models/api-models/api-errors/api-errors';
import {Component} from '@angular/core';
import {Input} from '@angular/core';
import {Language} from '../../../models/api-models/language/language';
import {OnDestroy} from '@angular/core';
import {OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';

@Component({
  selector: 'base-button',
  styleUrls: ['./base-button.component.scss'],
  template: `
    <button
      [class.arabic-font]="systemLanguage.direction === 'rtl'"
      [class.fluid]="fluid"
      [disabled]="disabled"
      [ngClass]="[kind, size, 'btn']"
      [style.direction]="systemLanguage.direction"
      [style.margin-top]="marginTop"
      [style.margin-bottom]="marginBottom"
      [type]="buttonType">
      <i *ngIf="icon" class="icon {{icon}}"></i>
      {{buttonText}}
    </button>`
})
export class BaseButtonComponent implements OnInit, OnDestroy {
  @Input() public buttonText: string = '';
  @Input() public buttonType: string = 'button'; // One of ['button', 'submit', 'reset']
  @Input() public disabled: boolean = false;
  @Input() public fluid: boolean;
  @Input() public icon: string;
  @Input() public kind: string = 'primary'; // One of ['primary', 'primary-light', 'secondary', 'secondary-light', 'inactive-light', 'inactive-dark']
  @Input() public marginBottom: string = '15px';
  @Input() public marginTop: string = '15px';
  @Input() public size: string = 'medium'; // One of ['tiny', 'small', 'medium', 'large']

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
