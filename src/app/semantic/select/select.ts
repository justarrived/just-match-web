import {AfterViewInit} from "@angular/core";
import {ChangeDetectionStrategy} from "@angular/core";
import {Component} from "@angular/core";
import {ElementRef} from "@angular/core";
import {EventEmitter} from "@angular/core";
import {FormControl} from "@angular/forms";
import {Inject} from "@angular/core";
import {Input} from "@angular/core";
import {isPlatformBrowser} from '@angular/common';
import {Language} from '../../models/api-models/language/language';
import {OnDestroy} from '@angular/core';
import {OnInit} from '@angular/core';
import {Output} from "@angular/core";
import {PLATFORM_ID} from "@angular/core";
import {Subscription} from 'rxjs/Subscription';
import {SystemLanguagesResolver} from '../../resolvers/system-languages/system-languages.resolver';
import {ViewChild} from "@angular/core";

declare var jQuery: any;

@Component({
  selector: "sm-select",
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
      class="ui-select-wrapper"
      style="width: 100%"
      [ngClass]="{'direction-rtl': systemLanguage.direction === 'rtl'}">
      <select
        [formControl]="control"
        class="ui {{class}} fluid dropdown"
        #select>
        <option
          value="">
          {{placeholder}}
        </option>
        <ng-content></ng-content>
      </select>
    </div>`
})
export class SemanticSelectComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() public control: FormControl = new FormControl();
  @Input() public class: string;
  @Input() public label: string;
  @Input() public options: {} = {};
  @Input() public placeholder: string;
  @Output() public onChange: EventEmitter<string> = new EventEmitter<string>();
  @ViewChild("select") public select: ElementRef;

  @Input("data")
  public set data(data: any) {
    if (isPlatformBrowser(this.platformId)) {
      if (data && this.control.value) {
        setTimeout(() => {
          jQuery(this.select.nativeElement).dropdown("set selected", this.control.value);
        }, 1);
      }
    }
  }

  public systemLanguage: Language;

  private systemLanguageSubscription: Subscription;

  public constructor(
    @Inject(PLATFORM_ID) private readonly platformId: any,
    private systemLanguagesResolver: SystemLanguagesResolver,
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

    const options: {} = Object.assign({
      sortSelect: true,
      forceSelection: false,
      onChange: (value: string) => {
        this.onChange.emit(value);
      },
      onHide: () => this.control.markAsTouched()
    }, this.options);

    if (isPlatformBrowser(this.platformId)) {
      jQuery(this.select.nativeElement)
        .dropdown(options);
    }
  }

  public ngOnDestroy(): void {
    if (this.systemLanguageSubscription) { this.systemLanguageSubscription.unsubscribe(); }
  }
}
