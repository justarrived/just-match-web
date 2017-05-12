import {Component} from "@angular/core";
import {Input} from "@angular/core";

@Component({
  selector: "sm-loader",
  template: `
    <div
      *ngIf="!complete || !resolved"
      class="ui active dimmer {{class}}">
      <div
        [ngClass]="{text: text}"
        class="ui loader">
        {{text}}
      </div>
    </div>`
})
export class SemanticLoaderComponent {
  @Input("class") public class: string;
  @Input("text") public text: string;
  @Input("complete") public complete: boolean = true;
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
