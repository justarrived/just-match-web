import {BaseComponent} from '../../base.component';
import {Component} from '@angular/core';
import {Input} from '@angular/core';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
import {UserResolver} from '../../../resolvers/user/user.resolver';

@Component({
  selector: 'hexagon-image',
  styleUrls: ['./hexagon-image.component.scss'],
  template: `
    <div
      class="hexagon-outer"
      [class.medium]="size === 'medium'">
      <div style="display:flex; justify-content: center;">
        <div class="hexagon"
          [style.background-image]="'url(' + imageUrl + ')'">
          <div class="hexTop"></div>
          <div class="hexBottom"></div>
        </div>
      </div>
    </div>`
})
export class HexagonImageComponent extends BaseComponent {
  @Input() public size: string = 'medium';
  @Input() public imageUrl: string;

  public constructor (
    protected systemLanguagesResolver: SystemLanguagesResolver,
    protected userResolver: UserResolver,
  ) {
    super(systemLanguagesResolver, userResolver);
  }
}
