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
        color="white"
        fontSize="large"
        textAlignmentLtr="center"
        textAlignmentRtl="center"
        underlineBelowColor="white"
        underlineBelowLtrAlignment="center"
        underlineBelowRtlAlignment="center"
        marginTop="0"
        marginBottom="2rem">
      </basic-title-text>
      <basic-title-text
        [text]="'home.instructions.first.section.instruction0' | translate"
        iconLeft="check circle outline"
        fontSize="small"
        color="white"
        marginTop="0">
      </basic-title-text>
      <basic-title-text
        [text]="'home.instructions.first.section.instruction1' | translate"
        iconLeft="check circle outline"
        fontSize="small"
        color="white"
        marginTop="0">
      </basic-title-text>
      <basic-title-text
        [text]="'home.instructions.first.section.instruction2' | translate"
        iconLeft="check circle outline"
        fontSize="small"
        color="white"
        marginTop="0">
      </basic-title-text>
      <basic-title-text
        [text]="'home.instructions.first.section.instruction3' | translate"
        iconLeft="check circle outline"
        fontSize="small"
        color="white"
        marginTop="0">
      </basic-title-text>
      <div class="how-it-works-button">
        <base-button
          [buttonText]="'common.find_assignment' | translate"
          [fluid]="true"
          [routerLink]="JARoutes.jobs.url(['1'])"
          kind="secondary-light"
          size="medium">
        </base-button>
      </div>
    </div>`
})
export class HowItWorksSectionComponent {
  public JARoutes = JARoutes;
}
