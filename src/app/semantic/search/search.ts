import "rxjs/add/operator/debounceTime";
import "rxjs/add/operator/distinctUntilChanged";
import {AfterViewInit} from "@angular/core";
import {ChangeDetectionStrategy} from "@angular/core";
import {Component} from "@angular/core";
import {EventEmitter} from "@angular/core";
import {FormControl} from "@angular/forms";
import {Input} from "@angular/core";
import {Output} from "@angular/core";
import {Language} from '../../models/api-models/language/language';
import {OnDestroy} from '@angular/core';
import {OnInit} from "@angular/core";
import {Subscription} from 'rxjs/Subscription';
import {SystemLanguagesResolver} from '../../resolvers/system-languages/system-languages.resolver';

@Component({
  selector: "sm-search",
  template: `
    <basic-text
      [text]="label"
      *ngIf="label"
      fontSize="small"
      fontWeight="bold"
      marginBottom="0"
      marginTop="0">
    </basic-text>
    <div
      [ngClass]="{'loading': loading}"
      class="ui search">
      <div
        class="ui input "
        [ngClass]="{'left': icon && systemLanguage.direction === 'ltr', 'right': icon && systemLanguage.direction === 'rtl', 'icon': icon}">
        <input
          [attr.placeholder]="placeholder"
          [class.arabic-font]="systemLanguage.direction === 'rtl'"
          [formControl]="searchControl"
          [style.direction]="systemLanguage.direction"
          [style.text-align]="systemLanguage.direction === 'ltr' ? 'left' : 'right'"
          class="prompt"
          type="text">
        <i
          *ngIf="icon"
          class="search icon">
        </i>
      </div>
      <div class="results"></div>
    </div>`
})
export class SemanticSearchComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() public icon: boolean;
  @Input() public label: string;
  @Input() public loading: boolean;
  @Input() public placeholder: string;
  @Input() public searchFrequency: number = 0;
  @Output() public onSearch: EventEmitter<string> = new EventEmitter<string>();

  public searchControl: FormControl = new FormControl();

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

  public ngAfterViewInit(): void {
    this.searchControl
      .valueChanges
      .distinctUntilChanged()
      .debounceTime(this.searchFrequency)
      .subscribe((data: string) => this.onSearch.emit(data));
  }

  public ngOnDestroy(): void {
    if (this.systemLanguageSubscription) { this.systemLanguageSubscription.unsubscribe(); }
  }
}
