import {ChangeDetectionStrategy} from "@angular/core";
import {Component} from "@angular/core";
import {EventEmitter} from "@angular/core";
import {FormControl} from "@angular/forms";
import {Input} from "@angular/core";
import {Language} from '../../models/api-models/language/language';
import {OnDestroy} from '@angular/core';
import {OnInit} from "@angular/core";
import {Output} from "@angular/core";
import {Subscription} from 'rxjs/Subscription';
import {SystemLanguagesResolver} from '../../resolvers/system-languages/system-languages.resolver';
import {ViewContainerRef} from "@angular/core";

@Component({
  selector: "sm-input",
  template: `
    <div
      class="field"
      [ngClass]="{error: (!control.valid && control.dirty) }">
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
          (keyup.enter)="onEnterKeyUp.emit()"
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
    </div>`
})
export class SemanticInputComponent implements OnInit, OnDestroy {
  @Input() public control: FormControl = new FormControl();
  @Input() public icon: string;
  @Input() public label: string;
  @Input() public model: {};
  @Input() public placeholder: string;
  @Input() public type: string = "text";
  @Output() public onEnterKeyUp: EventEmitter<any> = new EventEmitter<any>();

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

@Component({
  selector: "sm-checkbox",
  template: `
    <div
      class="field"
      [ngClass]="{error: (!control.value && control?.validator) }">
      <div class="ui checkbox">
        <input
          [formControl]="control"
          [id]="uniqueId"
          type="checkbox">
        <label
          [for]="uniqueId"
          *ngIf="label"
          style="cursor: pointer;">
          <basic-text
            [text]="label"
            *ngIf="label"
            marginBottom="0"
            marginTop="0">
          </basic-text>
        </label>
      </div>
    </div>`
})
export class SemanticCheckboxComponent {
  @Input() public control: FormControl = new FormControl();
  @Input() public label: string;
  @Input() public uniqueId: string;
}

@Component({
  selector: "sm-textarea",
  template: `
    <div
      [ngClass]="{error: (!control.valid && control.dirty) }"
      class="field">
      <basic-text
        [text]="label"
        *ngIf="label"
        fontSize="small"
        fontWeight="bold"
        marginBottom="0"
        marginTop="0">
      </basic-text>
      <textarea
        (keyup.enter)="onEnterKeyUp.emit()"
        [class.arabic-font]="systemLanguage.direction === 'rtl'"
        [formControl]="control"
        [placeholder]="placeholder"
        [style.direction]="systemLanguage.direction"
        [style.text-align]="systemLanguage.direction === 'ltr' ? 'left' : 'right'"
        [rows]="rows"
        autosize
        style="resize: none;">
      </textarea>
    </div>`
})
export class SemanticTextareaComponent implements OnInit, OnDestroy {
  @Input() public autofocus: boolean;
  @Input() public control: FormControl = new FormControl();
  @Input() public label: string;
  @Input() public placeholder: string;
  @Input() public rows: string;
  @Output() public onEnterKeyUp: EventEmitter<any> = new EventEmitter<any>();

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
