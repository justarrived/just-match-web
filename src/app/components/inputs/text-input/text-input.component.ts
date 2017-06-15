import {ApiErrors} from '../../../models/api-models/api-errors/api-errors';
import {Component} from '@angular/core';
import {Input} from '@angular/core';
import {InputErrorsComponent} from '../../form-errors/input-errors/input-errors.component';
import {Language} from '../../../models/api-models/language/language';
import {OnDestroy} from '@angular/core';
import {OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
import {ViewChild} from '@angular/core';

@Component({
  selector: 'text-input',
  template: `
    <div
      [ngClass]="{'error': inputErrors.hasErrors()}"
      [style.padding-bottom]="paddingBottom"
      class="field">
      <basic-text
        [text]="label"
        *ngIf="label"
        fontSize="small"
        fontWeight="bold"
        marginBottom="0"
        marginTop="0">
      </basic-text>
      <div
        class="ui input"
        [ngClass]="{'left': icon && systemLanguage.direction === 'ltr', 'right': icon && systemLanguage.direction === 'rtl', 'icon': icon}">
        <input
          [class.arabic-font]="systemLanguage.direction === 'rtl'"
          [formControl]="control"
          [style.direction]="systemLanguage.direction"
          [style.text-align]="systemLanguage.direction === 'ltr' ? 'left' : 'right'"
          [type]="type"
          #input
          placeholder="{{placeholder}}">
        <i
          *ngIf="icon"
          class="{{icon}} icon">
        </i>
      </div>
      <input-errors
        [apiAttribute]="apiAttribute"
        [apiErrors]="apiErrors"
        [control]="control"
        [maxLengthLabel]="maxLengthLabel"
        [minLengthLabel]="minLengthLabel"
        [patternLabel]="patternLabel"
        [requiredLabel]="requiredLabel">
      </input-errors>
      <input-hint-label [hint]="hint"></input-hint-label>
      <ng-content></ng-content>
    </div>`
})
export class TextInputComponent implements OnInit, OnDestroy {
  @Input() public apiAttribute: string;
  @Input() public apiErrors: any;
  @Input() public control: any;
  @Input() public hint: string;
  @Input() public icon: string;
  @Input() public label: string;
  @Input() public maxLengthLabel: string;
  @Input() public minLengthLabel: string;
  @Input() public patternLabel: string;
  @Input() public paddingBottom: string = '1em';
  @Input() public placeholder: string;
  @Input() public requiredLabel: string;
  @Input() public type: string = 'text';
  @ViewChild(InputErrorsComponent) inputErrors: InputErrorsComponent;

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
