import {BaseComponent} from '../../base.component';
import {Component} from '@angular/core';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
import {UserResolver} from '../../../resolvers/user/user.resolver';

@Component({
  selector: 'guide-pitch-section',
  styleUrls: ['./guide-pitch-section.component.scss'],
  template: `
    <div
      class="ui grid section-container"
      [style.direction]="systemLanguage.direction">
      <div class="eight wide tablet eight wide computer only column section-image">
      </div>
      <div class="sixteen wide mobile eight wide tablet eight wide computer column">
        <div class="ui basic very padded segment">
          <basic-title-text
            [text]="'section.guide_pitch.title' | translate"
            fontSize="huge"
            color="white"
            fontWeight="light">
          </basic-title-text>
          <basic-text
            [text]="'section.guide_pitch.body' | translate"
            fontSize="large"
            color="white">
          </basic-text>

          <basic-text
            [text]="'section.guide_pitch.content_example.first' | translate"
            color="white">
          </basic-text>
          <basic-text
            [text]="'section.guide_pitch.content_example.second' | translate"
            color="white">
          </basic-text>
          <basic-text
            [text]="'section.guide_pitch.content_example.third' | translate"
            color="white">
          </basic-text>
          <!-- TODO: Update the [routerLink] -->
          <base-navigation-button
            [routerLink]="JARoutes.jobs.url(['1'])"
            [buttonText]="'section.guide_pitch.guide.button' | translate"
            kind="secondary-light"
            size="small">
          </base-navigation-button>
        </div>
      </div>
    </div>`
})
export class GuidePitchSectionComponent extends BaseComponent {

  public constructor (
    protected systemLanguagesResolver: SystemLanguagesResolver,
    protected userResolver: UserResolver,
  ) {
    super(systemLanguagesResolver, userResolver);
  }
}
