import {BaseComponent} from '../../base.component';
import {Component} from '@angular/core';
import {NavigationService} from '../../../services/navigation.service';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
import {UserResolver} from '../../../resolvers/user/user.resolver';
import {UtalkCode} from '../../../models/api-models/utalk-code/utalk-code';
import {UtalkCodeProxy} from '../../../proxies/utalk-code/utalk-code.proxy';

@Component({
  selector: 'utalk-section',
  styleUrls: ['./utalk-section.component.scss'],
  template: `
    <div class="ui basic padded center aligned segment utalk-section-container">
      <basic-loader
        [promise]="utalkCode"
        class="inverted">
      </basic-loader>
      <basic-title-text
        [text]="'section.utalk.title' | translate"
        [underlineBelow]="true"
        color="white"
        fontSize="huge"
        textAlignmentLtr="center"
        textAlignmentRtl="center"
        underlineBelowColor="blue"
        underlineBelowLtrAlignment="center"
        underlineBelowRtlAlignment="center">
      </basic-title-text>
      <img
        *ngIf="!(utalkCode | async)"
        (click)="createUtalkCode()"
        alt="Utalk"
        class="ui large centered image"
        src="/assets/images/utalk-long-blue.png"
        style="cursor: pointer;">
      <a
        *ngIf="(utalkCode | async)"
        [href]="(utalkCode | async)?.signupUrl"
        target="_blank">
        <img
          alt="Utalk"
          class="ui large centered image"
          src="/assets/images/utalk-long-blue.png">
      </a>
      <div class="ui centered grid">
        <div class="ui sixteen wide mobile sixteen wide tablet twelve wide computer column">
          <basic-text
            [text]="'section.utalk.description' | translate"
            color="white"
            textAlignmentLtr="center"
            textAlignmentRtl="center">
          </basic-text>
          <basic-text
            [text]="'section.utalk.hint' | translate"
            color="white"
            textAlignmentLtr="center"
            textAlignmentRtl="center">
          </basic-text>
        </div>
      </div>
      <base-action-button
        *ngIf="!(utalkCode | async)"
        (click)="createUtalkCode()"
        [buttonText]="'section.utalk.button' | translate"
        kind="primary"
        size="medium">
      </base-action-button>
      <a
        *ngIf="(utalkCode | async)"
        [href]="(utalkCode | async)?.signupUrl"
        target="_blank">
        <base-action-button
          [buttonText]="'section.utalk.button' | translate"
          kind="primary"
          size="medium">
        </base-action-button>
      </a>
    </div>`
})
export class UtalkSectionComponent extends BaseComponent {
  public utalkCode: Promise<UtalkCode>;

  public constructor(
    private navigationService: NavigationService,
    private utalkCodeProxy: UtalkCodeProxy,
    protected systemLanguagesResolver: SystemLanguagesResolver,
    protected userResolver: UserResolver,
  ) {
    super(systemLanguagesResolver, userResolver);
  }

  public onInit() {
    this.loadData();
  }

  private loadData() {
    this.utalkCode = this.utalkCodeProxy.getUtalkCode(this.user.id);
  }

  public createUtalkCode() {
    var redirectWindow = window.open('https://utalk.com/en/start', '_blank');
    this.utalkCode = this.utalkCodeProxy.createUtalkCode(this.user.id).then(utalkCode => {
      redirectWindow.location.replace(utalkCode.signupUrl);
      return utalkCode;
    });
  }
}
