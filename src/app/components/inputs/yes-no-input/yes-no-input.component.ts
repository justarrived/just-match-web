import {ApiErrors} from '../../../models/api-models/api-errors/api-errors';
import {Component} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Input} from '@angular/core';
import {InputErrorsComponent} from '../../form-errors/input-errors/input-errors.component';
import {ViewChild} from '@angular/core';
import {Language} from '../../../models/api-models/language/language';
import {OnDestroy} from '@angular/core';
import {OnInit} from "@angular/core";
import {Subscription} from 'rxjs/Subscription';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';

@Component({
  selector: 'yes-no-input',
  template: `
    <div
      [ngClass]="{'error': inputErrors.hasErrors()}"
      [style.text-align]="systemLanguage.direction === 'ltr' ? 'left' : 'right'"
      class="field">
      <basic-text
        [text]="label"
        *ngIf="label"
        fontSize="small"
        fontWeight="bold"
        marginBottom="20px"
        marginTop="0">
      </basic-text>
      <custom-radio-button-input
        [control]="control"
        [label]="'common.yes' | translate"
        [name]="name"
        value="yes">
      </custom-radio-button-input>
      <custom-radio-button-input
        [control]="control"
        [label]="'common.no' | translate"
        [name]="name"
        value="no">
      </custom-radio-button-input>
      <input-errors
        [apiAttribute]="apiAttribute"
        [apiErrors]="apiErrors"
        [control]="control"
        [requiredLabel]="requiredLabel">
      </input-errors>
      <input-hint-label [hint]="hint"></input-hint-label>
    </div>`
})
export class YesNoInputComponent implements OnInit, OnDestroy {
  @Input() public apiAttribute: string;
  @Input() public apiErrors: ApiErrors;
  @Input() public control: FormControl;
  @Input() public hint: string;
  @Input() public label: string;
  @Input() public name: string;
  @Input() public requiredLabel: string;
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
