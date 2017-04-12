import {
  Output, EventEmitter, Component, Input, ChangeDetectionStrategy, ViewChild, ElementRef, AfterViewInit , OnDestroy, Renderer
} from "@angular/core";

declare var jQuery: any;

// because a of lot of shadow dom elements, we must create this fixSidebar
// function, to move elements to proper location before sidebar run.
jQuery.fn.fixSidebar = function(contextName: string = 'body') {
  let allModules = jQuery(this);

  allModules
    .each(function() {
      let
        selector = { pusher: ".pusher" },
        module = jQuery(this),
        context = jQuery(contextName || 'body');

      if (module.nextAll(selector.pusher).length === 0) {
        module.detach().prependTo(context);
      }
    });

  return this;
};

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
