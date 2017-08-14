import {BaseComponent} from '../../base.component';
import {Component} from '@angular/core';
import {Input} from '@angular/core';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
import {UserResolver} from '../../../resolvers/user/user.resolver';
import {ViewChild} from '@angular/core';

@Component({
  selector: 'basic-stepper',
  styleUrls: ['./basic-stepper.component.scss'],
  template: `
    <div class="card">
      <div class="supporting-text">
        <div class="stepper">
          <div
            *ngFor="let step of steps"
            [ngClass]="{'stepper-step': true, 'step-done': currentStep > step, 'editable-step': currentStep === step}">
            <div class="stepper-circle">
              <span>
                {{step}}
              </span>
            </div>
            <div class="stepper-bar-left"></div>
            <div class="stepper-bar-right"></div>
          </div>
        </div>
      </div>
    </div>`
})
export class BasicStepperComponent extends BaseComponent {
  @Input() public steps: number[];
  @Input() public currentStep: number;

  public constructor(
    protected systemLanguagesResolver: SystemLanguagesResolver,
    protected userResolver: UserResolver,
  ) {
    super(systemLanguagesResolver, userResolver);
  }
}
