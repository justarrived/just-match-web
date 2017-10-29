import {BaseComponent} from '../../base.component';
import {Component} from '@angular/core';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
import {UserResolver} from '../../../resolvers/user/user.resolver';

@Component({
  selector: 'employer-match-pitch-section',
  styleUrls: ['./employer-match-pitch-section.component.scss'],
  template: `
    <div
      class="ui grid section-container"
      [style.direction]="systemLanguage.direction">
      <div class="sixteen wide mobile column section-image">
        <div class="ui grid">
          <div class="sixteen wide mobile eight wide tablet eight wide computer column">
            <div class="ui basic very padded segment">
              <basic-title-text
                [text]="'section.employer_match_pitch.title' | translate"
                fontSize="huge"
                color="white"
                fontWeight="light">
              </basic-title-text>
              <!-- TODO: Update the [routerLink] -->
              <base-navigation-button
                [routerLink]="JARoutes.aboutUs.url()"
                [buttonText]="'section.employer_match_pitch.read_more.button' | translate"
                kind="secondary-light"
                size="small">
              </base-navigation-button>
            </div>
          </div>
        </div>
      </div>
    </div>`
})
export class EmployerMatchPitchSectionComponent extends BaseComponent {

  public constructor (
    protected systemLanguagesResolver: SystemLanguagesResolver,
    protected userResolver: UserResolver,
  ) {
    super(systemLanguagesResolver, userResolver);
  }
}
