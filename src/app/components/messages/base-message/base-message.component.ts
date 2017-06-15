import {BaseComponent} from '../../base.component';
import {Component} from "@angular/core";
import {ElementRef} from "@angular/core";
import {EventEmitter} from '@angular/core';
import {Inject} from "@angular/core";
import {Input} from "@angular/core";
import {isPlatformBrowser} from '@angular/common';
import {Output} from "@angular/core";
import {PLATFORM_ID} from "@angular/core";
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
import {UserResolver} from '../../../resolvers/user/user.resolver';
import {ViewChild} from "@angular/core";

declare var jQuery;

@Component({
  selector: "base-message",
  template: `
  <div
    class="ui {{class}} visible message"
    [ngClass]="{'icon': icon}"
    [style.flex-direction]="systemLanguage.direction === 'rtl' ? 'row-reverse' : 'row'"
    #message>
    <i
      (click)="close()"
      [style.left]="systemLanguage.direction === 'rtl' ? '.5em' : 'auto'"
      [style.right]="systemLanguage.direction === 'rtl' ? 'auto' : '.5em'"
      *ngIf="closeable"
      class="close icon">
    </i>
    <i
      [ngClass]="[icon, 'icon']"
      [style.margin-left]="systemLanguage.direction === 'rtl' ? '.6em' : '0'"
      [style.margin-right]="systemLanguage.direction === 'rtl' ? '0' : '.6em'"
      *ngIf="icon">
    </i>
    <ng-content></ng-content>
  </div>`
})
export class BaseMessageComponent extends BaseComponent {
  @Input() public class: string;
  @Input() public closeable: boolean;
  @Input() public icon: string;
  @Output() public onClosed: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild("message") public message: ElementRef;

  public constructor(
    @Inject(PLATFORM_ID) private readonly platformId: any,
    protected systemLanguagesResolver: SystemLanguagesResolver,
    protected userResolver: UserResolver,
  ) {
    super(systemLanguagesResolver, userResolver);
  }

  public close() {
    if (isPlatformBrowser(this.platformId)) {
      jQuery(this.message.nativeElement).transition('fade');
    }
    this.onClosed.emit();
  }
}
