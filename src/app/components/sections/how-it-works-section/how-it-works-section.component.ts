import {Component} from '@angular/core';
import {JARoutes} from '../../../routes/ja-routes';

@Component({
  selector: 'how-it-works-section',
  styleUrls: ['./how-it-works-section.component.scss'],
  template: `
    <div class="ui basic very padded segment how-it-works-container">
      <div class="ui basic center aligned segment">
        <h3>{{'home.instructions.first.section.title' | translate}}</h3>
      </div>
      <div class="instruction">
        <i class="fa fa-check-circle-o fa-2x"></i>
        <div class="instruction-text">
          {{'home.instructions.first.section.instruction0' | translate}}
        </div>
      </div>
      <div class="instruction">
        <i class="fa fa-check-circle-o fa-2x"></i>
        <div class="instruction-text">
          {{'home.instructions.first.section.instruction1' | translate}}
        </div>
      </div>
      <div class="instruction">
        <i class="fa fa-check-circle-o fa-2x"></i>
        <div class="instruction-text">
          {{'home.instructions.first.section.instruction2' | translate}}
        </div>
      </div>
      <div class="instruction">
        <i class="fa fa-check-circle-o fa-2x"></i>
        <div class="instruction-text">
          {{'home.instructions.first.section.instruction3' | translate}}
        </div>
      </div>
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
