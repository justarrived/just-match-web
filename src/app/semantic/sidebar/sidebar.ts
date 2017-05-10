import {AfterViewInit} from "@angular/core";
import {ChangeDetectionStrategy} from "@angular/core";
import {Component} from "@angular/core";
import {ElementRef} from "@angular/core";
import {EventEmitter} from "@angular/core";
import {Inject} from "@angular/core";
import {Input} from "@angular/core";
import {isPlatformBrowser} from '@angular/common';
import {OnDestroy} from "@angular/core";
import {Output} from "@angular/core";
import {PLATFORM_ID} from "@angular/core";
import {Renderer} from "@angular/core";
import {ViewChild} from "@angular/core";

declare var jQuery: any;

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: "sm-sidebar",
  template: `
    <div
      #sidebar
      class="ui sidebar {{class}}">
      <ng-content></ng-content>
    </div>`
})
export class SemanticSidebarComponent implements AfterViewInit, OnDestroy {
  @Input() public class: string;
  @Input() public options: any;
  @Output() public onShow: EventEmitter<any> = new EventEmitter<any>();
  @Output() public onHide: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild("sidebar") public sidebar: ElementRef;

  public constructor(
    @Inject(PLATFORM_ID) private readonly platformId: any,
    private renderer: Renderer,
  ) {
  }

  public show(): void {
    if (isPlatformBrowser(this.platformId)) {
      jQuery(this.sidebar.nativeElement)
        .sidebar("show");
    }
  }

  public hide(): void {
    if (isPlatformBrowser(this.platformId)) {
      jQuery(this.sidebar.nativeElement)
        .sidebar("hide");
    }
  }

  public ngAfterViewInit(): void {
    this.options.onVisible = (() => this.onShow.emit());
    this.options.onHide = (() => this.onHide.emit());
    this.options.debug = false;

    if (isPlatformBrowser(this.platformId)) {
      jQuery(this.sidebar.nativeElement)
        .sidebar(this.options);
    }
  }

  public ngOnDestroy(): void {
    this.renderer.detachView([this.sidebar.nativeElement]);
  }
}
