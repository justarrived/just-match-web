import {AfterViewInit} from "@angular/core";
import {ChangeDetectionStrategy} from "@angular/core";
import {Component} from "@angular/core";
import {Directive} from "@angular/core";
import {ElementRef} from "@angular/core";
import {EventEmitter} from "@angular/core";
import {Inject} from "@angular/core";
import {Input} from "@angular/core";
import {isPlatformBrowser} from '@angular/common';
import {OnDestroy} from "@angular/core";
import {Output} from "@angular/core";
import {PLATFORM_ID} from "@angular/core";
import {Renderer2} from '@angular/core';
import {ViewChild} from "@angular/core";

declare var jQuery: any;

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
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
      {{title}}
    </div>
    <div class="content">
        <ng-content select="modal-content"></ng-content>
    </div>
    <div class="actions">
        <ng-content select="modal-actions"></ng-content>
    </div>
</div>`
})
export class SemanticModalComponent implements AfterViewInit, OnDestroy {
  @Input() class: string;
  @Input() title: string;
  @Input() icon: string;
  @ViewChild("modal") modal: ElementRef;
  @Output() onModalShow: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() onModalHide: EventEmitter<boolean> = new EventEmitter<boolean>();

  public constructor(
    @Inject(PLATFORM_ID) private readonly platformId: any,
    private renderer: Renderer2,
  ) {
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
