import {AfterViewInit} from "@angular/core";
import {Component} from "@angular/core";
import {Directive} from "@angular/core";
import {ElementRef} from "@angular/core";
import {EventEmitter} from "@angular/core";
import {Inject} from "@angular/core";
import {Input} from "@angular/core";
import {isPlatformBrowser} from '@angular/common';
import {Language} from '../../models/api-models/language/language';
import {OnDestroy} from '@angular/core';
import {OnInit} from "@angular/core";
import {Output} from "@angular/core";
import {PLATFORM_ID} from "@angular/core";
import {Renderer2} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {SystemLanguagesResolver} from '../../resolvers/system-languages/system-languages.resolver';
import {ViewChild} from "@angular/core";

declare var jQuery: any;

@Component({
  selector: "sm-modal",
  template: `
  <div
    #modal
    class="ui modal {{class}}">
    <i class="close icon"></i>
    <div
      *ngIf="icon || title"
      [ngClass]="{'icon': icon}"
      class="ui header">
      <i
        *ngIf="icon"
        class="icon {{icon}}">
      </i>
      <basic-title-text
        [text]="title"
        [underlineBelow]="true"
        *ngIf="title"
        color="black"
        fontSize="medium"
        marginBottom="0"
        marginTop="0"
        textAlignmentLtr="center"
        textAlignmentRtl="center"
        underlineBelowColor="pink"
        underlineBelowLtrAlignment="center"
        underlineBelowRtlAlignment="center">
      </basic-title-text>
    </div>
    <div class="content">
        <ng-content select="modal-content"></ng-content>
    </div>
    <div class="actions">
        <ng-content select="modal-actions"></ng-content>
    </div>
</div>`
})
export class SemanticModalComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() class: string;
  @Input() title: string;
  @Input() icon: string;
  @ViewChild("modal") modal: ElementRef;
  @Output() onModalShow: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() onModalHide: EventEmitter<boolean> = new EventEmitter<boolean>();

  public systemLanguage: Language;

  private systemLanguageSubscription: Subscription;

  public constructor(
    @Inject(PLATFORM_ID) private readonly platformId: any,
    private systemLanguagesResolver: SystemLanguagesResolver,
    private renderer: Renderer2,
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
    if (isPlatformBrowser(this.platformId)) {
      jQuery(this.modal.nativeElement)
        .modal("refresh");
    }
  }

  public ngOnDestroy(): void {
    if (isPlatformBrowser(this.platformId)) {
      jQuery(this.modal.nativeElement)
        .modal("hide dimmer");
    }

    this.renderer.removeChild(this.renderer.parentNode(this.modal.nativeElement), this.modal.nativeElement);

    if (this.systemLanguageSubscription) { this.systemLanguageSubscription.unsubscribe(); }
  }

  public show(data: any = {}) {
    if (isPlatformBrowser(this.platformId)) {
      jQuery(this.modal.nativeElement)
        .modal(data)
        .modal("toggle");
    }

    this.onModalShow.next(true);
  }

  public hide() {
    if (isPlatformBrowser(this.platformId)) {
      jQuery(this.modal.nativeElement)
        .modal("hide");
    }

    this.onModalHide.emit(true);
  }
}

@Directive({ selector: 'modal-content, modal-actions' })
export class SMModalTagsDirective {
  // No behavior
  // The only purpose is to "declare" the tag in Angular2
}
