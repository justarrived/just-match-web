import {BaseComponent} from '../../base.component';
import {Component} from "@angular/core";
import {ElementRef} from "@angular/core";
import {EventEmitter} from "@angular/core";
import {Inject} from "@angular/core";
import {Input} from "@angular/core";
import {isPlatformBrowser} from '@angular/common';
import {Output} from "@angular/core";
import {PLATFORM_ID} from "@angular/core";
import {Renderer2} from '@angular/core';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
import {UserResolver} from '../../../resolvers/user/user.resolver';
import {ViewChild} from "@angular/core";

declare var jQuery: any;

@Component({
  selector: "basic-modal",
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
export class BasicModalComponent extends BaseComponent {
  @Input() class: string;
  @Input() title: string;
  @Input() icon: string;
  @ViewChild("modal") modal: ElementRef;
  @Output() onModalShow: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() onModalHide: EventEmitter<boolean> = new EventEmitter<boolean>();

  public constructor(
    @Inject(PLATFORM_ID) private readonly platformId: any,
    private renderer: Renderer2,
    protected systemLanguagesResolver: SystemLanguagesResolver,
    protected userResolver: UserResolver,
  ) {
    super(systemLanguagesResolver, userResolver);
  }

  public afterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      jQuery(this.modal.nativeElement)
        .modal("refresh");
    }
  }

  public onDestroy(): void {
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
