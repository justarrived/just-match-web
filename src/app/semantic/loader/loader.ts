import { Component, Input } from "@angular/core";

/**
 * Implementation of Loader element
 *
 * @link http://semantic-ui.com/elements/loader.html
 */
@Component({
  selector: "sm-loader",
  template: `<div *ngIf="!complete || !resolved" class="ui active dimmer {{class}}">
    <div [ngClass]="{text: text}" class="ui loader">{{text}}</div>
  </div>`
})
export class SemanticLoaderComponent {
  @Input("class") class: string;
  @Input("text") text: string;
  @Input("complete") complete: boolean = true;
  @Input("promise")
  public set promise(prom: Promise<any>) {
    if (prom) {
      this.resolved = false;
      prom.then(() => {
        this.resolved = true;
      }).catch(() => {
        this.resolved = true;
      });
    }
  }

  public resolved: boolean = true;
}
