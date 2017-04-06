import {
  Component, Input, ChangeDetectionStrategy, ViewChild, ElementRef, Directive, Output,
  EventEmitter, OnDestroy, AfterViewInit
} from "@angular/core";

declare var jQuery: any;

/**
 * Component, implementation of Semantic UI modal components.
 *
 * This component is triggered by SMModalDirective.
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: "sm-modal",
  template: `<div class="ui modal {{class}}" #modal>
    <i class="close icon"></i>
    <div *ngIf="icon || title" [ngClass]="{'icon': icon}" class="ui header">
        <i *ngIf="icon" class="icon {{icon}}"></i>
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

  public ngAfterViewInit(): void {
    jQuery(this.modal.nativeElement)
      .modal("refresh");
  }

  public ngOnDestroy(): void {
    jQuery(this.modal.nativeElement)
      .modal("hide dimmer");

    const parent = this.modal.nativeElement.parentElement;
    parent.removeChild(this.modal.nativeElement);
  }

  public show(data?: {}) {
    jQuery(this.modal.nativeElement)
      .modal(data || {})
      .modal("toggle");

    this.onModalShow.next(true);
  }

  public hide() {
    jQuery(this.modal.nativeElement)
      .modal("hide");

    this.onModalHide.emit(true);
  }
}

@Directive({ selector: 'modal-content, modal-actions' })
export class SMModalTagsDirective {
  // No behavior
  // The only purpose is to "declare" the tag in Angular2
}