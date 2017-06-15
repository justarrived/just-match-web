import {BaseComponent} from '../../base.component';
import {Component} from "@angular/core";
import {Input} from "@angular/core";
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
import {UserResolver} from '../../../resolvers/user/user.resolver';

@Component({
  selector: "basic-loader",
  template: `
    <div
      *ngIf="!complete || !resolved"
      class="ui active dimmer {{class}}">
      <div
        [ngClass]="{text: text}"
        class="ui text loader">
        <basic-title-text
          [text]="text"
          [uppercase]="true"
          *ngIf="text"
          color="gray"
          fontSize="small"
          fontWeight="light"
          textAlignmentRtl="center"
          textAlignmentLtr="center"
          marginBottom="0"
          marginTop="0">
        </basic-title-text>
      </div>
    </div>`
})
export class BasicLoaderComponent extends BaseComponent {
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

  public constructor(
    protected systemLanguagesResolver: SystemLanguagesResolver,
    protected userResolver: UserResolver,
  ) {
    super(systemLanguagesResolver, userResolver);
  }
}
