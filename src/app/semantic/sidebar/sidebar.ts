import {
  Output, EventEmitter, Component, Input, ChangeDetectionStrategy, ViewChild, ElementRef, AfterViewInit , OnDestroy, Renderer
} from "@angular/core";

declare var jQuery: any;

/**
 * Implementation of Sidebar module
 *
 * @link semantic-ui.com/modules/sidebar.html
 */
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

  public constructor(public renderer: Renderer) {
  }

  public show(): void {
    jQuery(this.sidebar.nativeElement)
      .sidebar("show");
  }

  public hide(): void {
    jQuery(this.sidebar.nativeElement)
      .sidebar("hide");
  }

  public ngAfterViewInit(): void {
    this.options.onVisible = (() => this.onShow.emit());
    this.options.onHide = (() => this.onHide.emit());
    this.options.debug = false;

    jQuery(this.sidebar.nativeElement)
      .sidebar(this.options);
  }

  public ngOnDestroy(): void {
    this.renderer.detachView([this.sidebar.nativeElement]);
  }
}
