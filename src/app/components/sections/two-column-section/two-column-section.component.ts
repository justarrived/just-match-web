import {BaseComponent} from '../../base.component';
import {Component} from '@angular/core';
import {Input} from "@angular/core";
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
import {UserResolver} from '../../../resolvers/user/user.resolver';

@Component({
  selector: 'two-column-section',
  styleUrls: ['./two-column-section.component.scss'],
  template: `
    <div
      class="ui grid section-container"
      [style.direction]="systemLanguage.direction"
      [style.flexDirection]="flexDirection"
      [class.primary]="isPrimaryBackground"
      [class.secondary]="isSecondaryBackground">

      <div class="sixteen wide mobile ten wide tablet eight wide computer column">
        <div class="ui basic very padded segment">
          <ng-content></ng-content>
        </div>
      </div>

      <div class="eight wide tablet eight wide computer only column section-image"
      [style.backgroundColor]="backgroundColor ? backgroundColor : null"
      [style.backgroundImage]="backgroundImageUrl ? 'url('+ backgroundImageUrl +')' : null">
      </div>
    </div>`
})
export class TwoColumnSectionComponent extends BaseComponent {
  @Input() backgroundImageUrl: string;
  @Input() backgroundColor: string;
  @Input() backgroundImagePlacement: string = 'right';
  @Input() sectionBackground: string;

  public constructor (
    protected systemLanguagesResolver: SystemLanguagesResolver,
    protected userResolver: UserResolver,
  ) {
    super(systemLanguagesResolver, userResolver);
  }

  get flexDirection(): string {
    if (this.backgroundImagePlacement === 'right') {
      return 'row';
    }

    return 'row-reverse';
  }

  get isPrimaryBackground(): boolean {
    return this.sectionBackground === 'primary';
  }

  get isSecondaryBackground(): boolean {
    return this.sectionBackground === 'secondary';
  }
}
