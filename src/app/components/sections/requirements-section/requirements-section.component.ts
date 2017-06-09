import {BaseComponent} from '../../base.component';
import {Component} from '@angular/core';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
import {UserResolver} from '../../../resolvers/user/user.resolver';

@Component({
  selector: 'requirements-section',
  styleUrls: ['./requirements-section.component.scss'],
  template: `
    <div
      class="ui grid requirements-section-container"
      [style.direction]="systemLanguage.direction">
      <div class="sixteen wide mobile eight wide tablet eight wide computer column">
        <div class="ui basic very padded segment">
          <basic-title-text
            [text]="'requirements.section.title' | translate"
            color="white"
            fontSize="medium">
          </basic-title-text>
          <basic-title-text
            [text]="'requirements.section.residence.permit.title' | translate"
            color="white"
            fontSize="small">
          </basic-title-text>
          <basic-title-text
            [text]="'requirements.section.residence.permit.requirement1' | translate"
            color="white"
            fontSize="tiny"
            iconLeft="check"
            fontWeight="light">
          </basic-title-text>
          <basic-title-text
            [text]="'requirements.section.asylum.seeker.title' | translate"
            color="white"
            fontSize="small">
          </basic-title-text>
          <basic-title-text
            [text]="'requirements.section.asylum.seeker.requirement1' | translate"
            color="white"
            fontSize="tiny"
            iconLeft="check"
            fontWeight="light">
          </basic-title-text>
          <basic-title-text
            [text]="'requirements.section.asylum.seeker.requirement2' | translate"
            color="white"
            fontSize="tiny"
            iconLeft="check"
            fontWeight="light">
          </basic-title-text>
          <basic-title-text
            [text]="'requirements.section.asylum.seeker.requirement3' | translate"
            color="white"
            fontSize="tiny"
            iconLeft="check"
            fontWeight="light">
          </basic-title-text>
          <basic-title-text
            [text]="'requirements.section.eu.citizen.title' | translate"
            color="white"
            fontSize="small">
          </basic-title-text>
          <basic-title-text
            [text]="'requirements.section.eu.citizen.requirement1' | translate"
            color="white"
            fontSize="tiny"
            iconLeft="check"
            fontWeight="light">
          </basic-title-text>
          <basic-title-text
            [text]="'requirements.section.eu.citizen.requirement2' | translate"
            color="white"
            fontSize="tiny"
            iconLeft="check"
            fontWeight="light">
          </basic-title-text>
          <base-button
            [routerLink]="JARoutes.faq.url()"
            [buttonText]="'requirements.section.read.more.button' | translate"
            kind="primary"
            size="small">
          </base-button>
        </div>
      </div>
      <div class="eight wide tablet eight wide computer only column requirements-section-image">
      </div>
    </div>`
})
export class RequirementsSectionComponent extends BaseComponent {

  public constructor (
    protected systemLanguagesResolver: SystemLanguagesResolver,
    protected userResolver: UserResolver,
  ) {
    super(systemLanguagesResolver, userResolver);
  }
}
