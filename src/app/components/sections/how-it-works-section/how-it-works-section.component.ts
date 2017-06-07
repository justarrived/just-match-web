import {Component} from '@angular/core';
import {JARoutes} from '../../../routes/ja-routes/ja-routes';

@Component({
  selector: 'how-it-works-section',
  styleUrls: ['./how-it-works-section.component.scss'],
  template: `
    <div class="ui basic very padded segment how-it-works-container">
      <basic-title-text
        [text]="'home.instructions.first.section.title' | translate"
        [underlineBelow]="true"
        color="black"
        fontSize="huge"
        textAlignmentLtr="center"
        textAlignmentRtl="center"
        underlineBelowColor="pink"
        underlineBelowLtrAlignment="center"
        underlineBelowRtlAlignment="center"
        marginTop="0"
        marginBottom="2rem">
      </basic-title-text>
      <div class="ui centered grid">
        <div class="sixteen wide phone twelve wide tablet four wide computer column">
          <img
            class="ui centered tiny image"
            src="/assets/images/how-it-works-icon-1.png"
            style="padding-left: 15px;">
          <basic-title-text
            [text]="'how.it.works.section.register.description.title' | translate"
            color="black"
            fontSize="medium"
            textAlignmentRtlTablet="center"
            textAlignmentLtrTablet="center">
          </basic-title-text>
          <basic-text
            [text]="'how.it.works.section.register.description.paragraph.1' | translate"
            color="black"
            textAlignmentRtlTablet="center"
            textAlignmentLtrTablet="center">
          </basic-text>
          <basic-text
            [text]="'how.it.works.section.register.description.paragraph.2' | translate"
            color="black"
            textAlignmentRtlTablet="center"
            textAlignmentLtrTablet="center">
          </basic-text>
        </div>
        <div class="sixteen wide phone twelve wide tablet four wide computer column">
          <img
            class="ui centered tiny image"
            src="/assets/images/how-it-works-icon-2.png"
            style="padding-left: 15px;">
          <basic-title-text
            [text]="'how.it.works.section.update.profile.description.title' | translate"
            color="black"
            fontSize="medium"
            textAlignmentRtlTablet="center"
            textAlignmentLtrTablet="center">
          </basic-title-text>
          <basic-text
            [text]="'how.it.works.section.update.profile.description.paragraph.1' | translate"
            color="black"
            textAlignmentRtlTablet="center"
            textAlignmentLtrTablet="center">
          </basic-text>
          <basic-text
            [text]="'how.it.works.section.update.profile.description.paragraph.2' | translate"
            color="black"
            textAlignmentRtlTablet="center"
            textAlignmentLtrTablet="center">
          </basic-text>
        </div>
        <div class="sixteen wide phone twelve wide tablet four wide computer column">
          <img
            class="ui centered tiny image"
            src="/assets/images/how-it-works-icon-3.png"
            style="padding-left: 15px;">
          <basic-title-text
            [text]="'how.it.works.section.find.jobs.description.title' | translate"
            color="black"
            fontSize="medium"
            textAlignmentRtlTablet="center"
            textAlignmentLtrTablet="center">
          </basic-title-text>
          <basic-text
            [text]="'how.it.works.section.find.jobs.description.paragraph.1' | translate"
            color="black"
            textAlignmentRtlTablet="center"
            textAlignmentLtrTablet="center">
          </basic-text>
          <basic-text
            [text]="'how.it.works.section.find.jobs.description.paragraph.2' | translate"
            color="black"
            textAlignmentRtlTablet="center"
            textAlignmentLtrTablet="center">
          </basic-text>
        </div>
      </div>
      <div style="margin: 0 auto; width: 200px;">
        <base-button
          [routerLink]="JARoutes.jobs.url(['1'])"
          [buttonText]="'how.it.works.section.jobs.button' | translate"
          [fluid]="true"
          kind="primary"
          size="small">
        </base-button>
        <br>
        <base-button
          [routerLink]="JARoutes.registerUser.url()"
          [buttonText]="'how.it.works.section.create.accont.button' | translate"
          [fluid]="true"
          kind="primary"
          size="small">
        </base-button>
      </div>
    </div>`
})
export class HowItWorksSectionComponent {
  public JARoutes = JARoutes;
}
