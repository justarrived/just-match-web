import {BaseComponent} from '../../base.component';
import {Component} from "@angular/core";
import {ElementRef} from "@angular/core";
import {EventEmitter} from "@angular/core";
import {Inject} from "@angular/core";
import {Input} from "@angular/core";
import {isPlatformBrowser} from '@angular/common';
import {ModalService} from '../../../services/modal.service';
import {Output} from "@angular/core";
import {PLATFORM_ID} from "@angular/core";
import {Renderer2} from '@angular/core';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
import {UserResolver} from '../../../resolvers/user/user.resolver';
import {ViewChild} from "@angular/core";

declare var jQuery: any;

@Component({
  selector: "step-modal",
  styleUrls: ['./step-modal.component.scss'],
  template: `
  <div
    #modal
    class="ui modal">
    <i class="close icon"></i>
    <div class="banner-container">
      <ng-content select="modal-header"></ng-content>
    </div>
    <div class="content-container">
      <i
        (click)="previous(true)"
        [class.disabled]="!previousModal"
        class="huge pink chevron left icon">
      </i>
      <div class="modal-content">
        <ng-content select="modal-content"></ng-content>
      </div>
      <i
        (click)="next(true)"
        [class.disabled]="!nextModal"
        class="huge pink chevron right icon">
      </i>
    </div>
</div>`
})
export class StepModalComponent extends BaseComponent {
  @Input() public nextModal: string;
  @Input() public goToNextOnClick: boolean = true;
  @Input() public previousModal: string;
  @Input() public goToPreviousOnClick: boolean = true;
  @Output() onModalHide: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() onModalShow: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() onNextClick: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() onPreviousClick: EventEmitter<boolean> = new EventEmitter<boolean>();
  @ViewChild("modal") modal: ElementRef;

  public constructor(
    @Inject(PLATFORM_ID) private readonly platformId: any,
    private modalService: ModalService,
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

  public show() {
    if (isPlatformBrowser(this.platformId)) {
      jQuery(this.modal.nativeElement)
        .modal({
          autofocus: false,
          transition: 'horizontal flip'
        })
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

  public next(clicked: boolean): void {
    if (clicked) {
      this.onNextClick.emit(true);
    }
    if (this.nextModal && (!clicked || (clicked && this.goToNextOnClick))) {
      this.modalService.showModal(this.nextModal, false, false, 400);
    }
  }

  public previous(clicked: boolean): void {
    if (clicked) {
      this.onPreviousClick.emit(true);
    }
    if (this.previousModal && (!clicked || (clicked && this.goToPreviousOnClick))) {
      this.modalService.showModal(this.previousModal, false, false, 400);
    }
  }
}
