import {BaseComponent} from '../../base.component';
import {Component} from '@angular/core';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
import {UserResolver} from '../../../resolvers/user/user.resolver';

@Component({
  selector: 'welcome-banner-section',
  template: `
    <div class="ui basic segment welcome-banner-section-container">
      <div class="ui centered grid">
        <div class="sixteen wide mobile twelve wide tablet ten wide computer column">
        <basic-title-text
          [text]="'home.header.logged.out.title' | translate "
          *ngIf="!user"
          color="white"
          fontSize="large"
          textAlignmentLtr="left"
          textAlignmentLtrTablet="center"
          textAlignmentRtl="right"
          textAlignmentRtlTablet="center">
        </basic-title-text>

        <basic-title-text
          [text]="'home.header.logged.in.title' | translate: {username: user.firstName}"
          *ngIf="user"
          color="white"
          fontSize="large"
          textAlignmentLtr="left"
          textAlignmentLtrTablet="center"
          textAlignmentRtl="right"
          textAlignmentRtlTablet="center">
        </basic-title-text>

        <basic-title-text
          [text]="'home.header.logged.out.sub.title' | translate"
          color="white"
          fontSize="small"
          textAlignmentLtr="left"
          textAlignmentLtrTablet="center"
          textAlignmentRtl="right"
          textAlignmentRtlTablet="center">
        </basic-title-text>

        <basic-text
          [text]="'home.header.logged.out.description' | translate"
          color="white"
          textAlignmentLtr="left"
          textAlignmentLtrTablet="center"
          textAlignmentRtl="right"
          textAlignmentRtlTablet="center">
        </basic-text>

        <div
          [style.display]="'flex'"
          [style.direction]="systemLanguage.direction"
          class="welcome-banner-section-button-outer-container">
          <div
            class="welcome-banner-section-button-container">
            <div *ngIf="!user">
              <base-button
                [buttonText]="'home.header.logged.out.register.button' | translate"
                [fluid]="true"
                [routerLink]="JARoutes.registerUser.url()"
                kind="secondary-light"
                size="small">
              </base-button>
              <br>
              <base-button
                [buttonText]="'home.header.logged.out.login.button' | translate"
                [routerLink]="JARoutes.login.url()"
                [fluid]="true"
                kind="primary-light"
                size="small">
              </base-button>
            </div>

            <div *ngIf="user">
              <base-button
                [buttonText]="'home.header.logged.in.profile.button' | translate"
                [routerLink]="JARoutes.user.url()"
                [fluid]="true"
                kind="secondary-light"
                size="small">
              </base-button>
              <br>
              <base-button
                [buttonText]="'home.header.logged.in.jobs.button' | translate"
                [routerLink]="JARoutes.jobs.url()"
                [fluid]="true"
                kind="primary-light"
                size="small">
              </base-button>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>`,
  styleUrls: ['./welcome-banner-section.component.scss']
})
export class WelcomeBannerSectionComponent extends BaseComponent {

  public constructor (
    protected systemLanguagesResolver: SystemLanguagesResolver,
    protected userResolver: UserResolver,
  ) {
    super(systemLanguagesResolver, userResolver);
  }
}
