import {BaseComponent} from '../../base.component';
import {Component} from '@angular/core';
import {Input} from '@angular/core';
import {LanguageMenuComponent} from '../../menus/language-menu/language-menu.component';
import {NavigationMenuComponent} from '../../menus/navigation-menu/navigation-menu.component';
import {slideInUpOutBottomAnimation} from '../../../animations/slide-in-up-out-bottom/slide-in-up-out-bottom.animation';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
import {UserResolver} from '../../../resolvers/user/user.resolver';

const menuAnimationDuration = 400;

@Component({
  animations: [slideInUpOutBottomAnimation(menuAnimationDuration + 'ms', '100%')],
  selector: 'secondary-navigation',
  styleUrls: ['./secondary-navigation.component.scss'],
  template: `
    <div
      class="navigation-container"
      [@slideInUpOutBottomAnimation]="animationState">
      <ng-content></ng-content>
    </div>`
})
export class SecondaryNavigationComponent extends BaseComponent {
  public animationState: string = 'out';

  @Input('navIsVisible')
  set navIsVisible(visible: boolean) {
    if (visible) {
      this.animationState = 'in';
    } else {
      this.animationState = 'out';
    }
  }

  public constructor(
    protected systemLanguagesResolver: SystemLanguagesResolver,
    protected userResolver: UserResolver,
  ) {
    super(systemLanguagesResolver, userResolver);
  }
}
