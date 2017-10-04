import {Application} from '../../../models/api-models/application/application';
import {BaseComponent} from '../../base.component';
import {Component} from '@angular/core';
import {fadeInAnimation} from '../../../animations/fade-in/fade-in.animation';
import {Input} from '@angular/core';
import {JARoutes} from '../../../routes/ja-routes/ja-routes';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
import {UserResolver} from '../../../resolvers/user/user.resolver';

@Component({
  animations: [fadeInAnimation('200ms')],
  selector: 'guide-card',
  styleUrls: ['./guide-card.component.scss'],
  template: `
    <div
      [@fadeInAnimation]="animationState"
      class="ui raised card guide-card"
      [style.width]="width"
      [class.link]="clickable">
      <a
        *ngIf="cornerIcon"
        class="ui {{cornerIconBackgroundColor}} right corner label">
        <i class="{{cornerIcon}} icon"></i>
      </a>
      <basic-title-text
        [text]="fadedTitle"
        [uppercase]="true"
        color="gray"
        fontSize="tiny"
        marginTop="0"
        marginBottom="0">
      </basic-title-text>
      <basic-title-text
        [text]="title"
        color="black"
        fontSize="medium"
        [underlineBelow]="true"
        underlineBelowColor="pink"
        marginTop="1rem">
      </basic-title-text>
      <ng-content></ng-content>
    </div>`

})
export class GuideCardComponent extends BaseComponent {
  @Input() public animationDelay: number = 1;
  @Input() public clickable: boolean;
  @Input() public cornerIcon: string;
  @Input() public cornerIconBackgroundColor: string;
  @Input() public fadedTitle: string;
  @Input() public title: string;
  @Input() public width: string = '290px';

  public animationState: string = 'hidden';

  public constructor (
    protected systemLanguagesResolver: SystemLanguagesResolver,
    protected userResolver: UserResolver,
  ) {
    super(systemLanguagesResolver, userResolver);
  }

  public onInit(): void {
    setTimeout(() => {
      this.animationState = 'visible';
    }, this.animationDelay);
  }
}
