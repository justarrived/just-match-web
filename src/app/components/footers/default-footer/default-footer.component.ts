import {BaseComponent} from '../../base.component';
import {Component} from '@angular/core';
import {JARoutes} from '../../../routes/ja-routes/ja-routes';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
import {UserResolver} from '../../../resolvers/user/user.resolver';

@Component({
  selector: 'default-footer',
  styleUrls: ['./default-footer.component.scss'],
  template: `
    <div class="footer-container">
      <div
        class="ui basic very padded segment"
        style="padding-bottom: 0;">
        <img
          class="ui centered image"
          src="/assets/images/just-arrived-vertical-white-logo.png"
          style="width: 200px; height: auto;">
      </div>
      <div
        class="ui basic very padded segment"
        style="padding-top: 0;">
        <div
          class="ui centered grid sections-container"
          [style.direction]="systemLanguage.direction">
          <div class="sixteen wide mobile sixteen wide tablet four wide computer column">
            <basic-title-text
              [text]="'footer.get.started.section.title' | translate"
              color="pink"
              fontSize="tiny"
              textAlignmentLtrTablet="center"
              textAlignmentRtlTablet="center">
            </basic-title-text>
            <basic-link
              *ngIf="!user"
              [routerLink]="JARoutes.login.url()"
              [text]="'footer.get.started.section.login' | translate"
              color="white"
              marginBottom="0.4rem"
              marginTop="0"
              textAlignmentLtrTablet="center"
              textAlignmentRtlTablet="center">
            </basic-link>
            <basic-link
              *ngIf="!user"
              [routerLink]="JARoutes.registerUser.url()"
              [text]="'footer.get.started.section.register' | translate"
              color="white"
              marginBottom="0.4rem"
              marginTop="0"
              textAlignmentLtrTablet="center"
              textAlignmentRtlTablet="center">
            </basic-link>
            <basic-link
              *ngIf="user"
              [routerLink]="JARoutes.jobs.url(['1'])"
              [text]="'footer.get.started.section.jobs' | translate"
              color="white"
              marginBottom="0.4rem"
              marginTop="0"
              textAlignmentLtrTablet="center"
              textAlignmentRtlTablet="center">
            </basic-link>
            <basic-link
              *ngIf="user"
              [routerLink]="JARoutes.user.url()"
              [text]="'footer.get.started.section.profile' | translate"
              color="white"
              marginBottom="0.4rem"
              marginTop="0"
              textAlignmentLtrTablet="center"
              textAlignmentRtlTablet="center">
            </basic-link>
          </div>
          <div class="sixteen wide mobile sixteen wide tablet four wide computer column">
            <basic-title-text
              [text]="'footer.about.us.section.title' | translate"
              color="pink"
              fontSize="tiny"
              textAlignmentLtrTablet="center"
              textAlignmentRtlTablet="center">
            </basic-title-text>
            <basic-link
              [text]="'footer.about.us.section.just.arrived' | translate"
              color="white"
              href="https://justarrived.se/about-us/?utm_source=justarrived_app&utm_medium=web&utm_content=footer"
              marginBottom="0.4rem"
              marginTop="0"
              textAlignmentLtrTablet="center"
              textAlignmentRtlTablet="center">
            </basic-link>
            <basic-link
              [text]="'footer.about.us.section.careers' | translate"
              color="white"
              href="https://careers.justarrived.se/?utm_source=justarrived_app&utm_medium=web&utm_content=footer"
              marginBottom="0.4rem"
              marginTop="0"
              textAlignmentLtrTablet="center"
              textAlignmentRtlTablet="center">
            </basic-link>
            <basic-link
              [text]="'footer.about.us.section.press' | translate"
              color="white"
              href="https://justarrived.se/press/?utm_source=justarrived_app&utm_medium=web&utm_content=footer"
              marginBottom="0.4rem"
              marginTop="0"
              textAlignmentLtrTablet="center"
              textAlignmentRtlTablet="center">
            </basic-link>
            <basic-link
              [routerLink]="JARoutes.faq.url()"
              [text]="'footer.about.us.section.faq' | translate"
              color="white"
              marginBottom="0.4rem"
              marginTop="0"
              textAlignmentLtrTablet="center"
              textAlignmentRtlTablet="center">
            </basic-link>
          </div>
          <div class="sixteen wide mobile sixteen wide tablet four wide computer column">
            <basic-title-text
              [text]="'footer.contact.us.section.title' | translate"
              color="pink"
              fontSize="tiny"
              textAlignmentLtrTablet="center"
              textAlignmentRtlTablet="center">
            </basic-title-text>
            <basic-link
              [alwaysLtrText]="true"
              text="hej@justarrived.se"
              color="white"
              href="mailto:hej@justarrived.se"
              marginBottom="0.4rem"
              marginTop="0"
              textAlignmentLtrTablet="center"
              textAlignmentRtlTablet="center">
            </basic-link>
            <basic-link
              [alwaysLtrText]="true"
              text="Just Arrived"
              color="white"
              href="https://justarrived.se/?utm_source=justarrived_app&utm_medium=web&utm_content=footer"
              marginBottom="0.4rem"
              marginTop="0"
              textAlignmentLtrTablet="center"
              textAlignmentRtlTablet="center">
            </basic-link>
            <basic-link
              [alwaysLtrText]="true"
              text="Sveavägen 31, Plan 3, 111 34 Stockholm"
              color="white"
              href="https://goo.gl/maps/SdEcXDYx81U2"
              marginBottom="0.4rem"
              marginTop="0"
              textAlignmentLtrTablet="center"
              textAlignmentRtlTablet="center">
            </basic-link>
          </div>
          <div class="sixteen wide mobile sixteen wide tablet four wide computer column social-media-column">
            <basic-title-text
              [text]="'footer.follow.us.section.title' | translate"
              color="pink"
              fontSize="tiny"
              textAlignmentLtrTablet="center"
              textAlignmentRtlTablet="center">
            </basic-title-text>
            <social-media-section></social-media-section>
          </div>
        </div>
        <basic-text
          [alwaysLtrText]="true"
          text="© 2017 Just Arrived"
          color="white"
          marginTop="2rem"
          textAlignmentLtr="center"
          textAlignmentRtl="center">
        </basic-text>
      </div>
    </div>`
})
export class DefaultFooterComponent extends BaseComponent {
  public JARoutes = JARoutes;

  public constructor (
    protected systemLanguagesResolver: SystemLanguagesResolver,
    protected userResolver: UserResolver,
  ) {
    super(systemLanguagesResolver, userResolver);
  }
}
