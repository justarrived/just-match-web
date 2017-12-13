import {BaseComponent} from '../../base.component';
import {Component} from '@angular/core';
import {ModalService} from '../../../services/modal.service';
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
        alt="Utalk"
        class="ui large centered image"
        src="/assets/images/utalk-long-blue.png">
      <div class="ui centered grid">
        <div class="ui sixteen wide mobile twelve wide tablet eight wide computer column">
          <basic-text
            [text]="'section.utalk.description' | translate"
            color="white"
            textAlignmentLtr="center"
            textAlignmentRtl="center">
          </basic-text>
          <div *ngIf="user" class="cta-container">
            <basic-text
              [text]="'section.utalk.hint' | translate"
              color="white"
              textAlignmentLtr="center"
              textAlignmentRtl="center">
            </basic-text>
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
          </div>
          <div *ngIf="!user" class="cta-container">
            <base-action-button
              *ngIf="!(utalkCode | async)"
              [buttonText]="'section.utalk.not_logged_in_button' | translate"
              (click)="openLoginOrRegisterModal()"
              kind="primary"
              size="medium">
            </base-action-button>
          </div>
        </div>
      </div>
    </div>`
})
export class UtalkSectionComponent extends BaseComponent {
  public utalkCode: Promise<UtalkCode>;

  public constructor(
    private navigationService: NavigationService,
    private modalService: ModalService,
    private utalkCodeProxy: UtalkCodeProxy,
    protected systemLanguagesResolver: SystemLanguagesResolver,
    protected userResolver: UserResolver,
  ) {
    super(systemLanguagesResolver, userResolver);
  }

  public onInit() {
    this.loadData();
  }

  private loadData(): void {
    if (!this.user) return;

    this.utalkCode = this.utalkCodeProxy.getUtalkCode(this.user.id);
  }

  public openLoginOrRegisterModal(): void {
    this.modalService.showModal('loginOrRegisterModalComponent', false, true, 0);
  }

  public createUtalkCode(): void {
    if (!this.user) return;

    this.utalkCode = this.utalkCodeProxy.createUtalkCode(this.user.id).then(utalkCode => {
      if (!window) return; // Page rendered on server

      window.location.replace(utalkCode.signupUrl);
      return utalkCode;
    });
  }
}
