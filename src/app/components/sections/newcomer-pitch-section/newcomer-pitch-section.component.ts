import {BaseComponent} from '../../base.component';
import {Component} from '@angular/core';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
import {UserResolver} from '../../../resolvers/user/user.resolver';

@Component({
  selector: 'newcomer-pitch-section',
  styleUrls: ['./newcomer-pitch-section.component.scss'],
  template: `
    <div
      class="ui grid section-container"
      [style.direction]="systemLanguage.direction">
      <div class="sixteen wide mobile eight wide tablet eight wide computer column">
        <div class="ui basic very padded segment">
          <basic-title-text
            [text]="'section.newcomer_pitch.title' | translate"
            fontSize="huge"
            color="white"
            fontWeight="light">
          </basic-title-text>
          <basic-text
            [text]="'section.newcomer_pitch.body' | translate"
            color="white">
          </basic-text>

          <base-navigation-button
            [routerLink]="JARoutes.registerUser.url()"
            [buttonText]="'section.newcomer_pitch.register.button' | translate"
            kind="primary"
            size="small">
          </base-navigation-button>
          <base-navigation-button
            [routerLink]="JARoutes.jobs.url(['1'])"
            [buttonText]="'section.newcomer_pitch.jobs.button' | translate"
            kind="primary"
            size="small">
          </base-navigation-button>
        </div>
      </div>
      <div class="eight wide tablet eight wide computer only column section-image">
      </div>
    </div>`
})
export class NewcomerPitchSectionComponent extends BaseComponent {

  public constructor (
    protected systemLanguagesResolver: SystemLanguagesResolver,
    protected userResolver: UserResolver,
  ) {
    super(systemLanguagesResolver, userResolver);
  }
}
