import {ChangeDetectionStrategy} from "@angular/core";
import {Component} from "@angular/core";
import {ElementRef} from "@angular/core";
import {EventEmitter} from '@angular/core';
import {Input} from "@angular/core";
import {Output} from "@angular/core";
import {ViewChild} from "@angular/core";
import {ViewEncapsulation} from "@angular/core";

declare var jQuery;

@Component({
  selector: "sm-message",
  template: `
  <div
    class="ui {{class}} visible message"
    [ngClass]="{'icon': icon}"
    #message>
    <i
      (click)="close()"
      *ngIf="closeable"
      class="close icon">
    </i>
    <i
      [ngClass]="[icon, 'icon']"
      *ngIf="icon">
    </i>
    <ng-content></ng-content>
  </div>`
})
export class SemanticMessageComponent {
  @Input() public class: string;
  @Input() public closeable: boolean;
  @Input() public icon: string;
  @Output() public onClosed: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild("message") public message: ElementRef;

  public close() {
    jQuery(this.message.nativeElement).transition('fade');
    this.onClosed.emit();
  }
}
