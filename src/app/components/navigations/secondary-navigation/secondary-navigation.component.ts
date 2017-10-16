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
      [@slideInUpOutBottomAnimation]="animationState"
      [class.bgWhite]="backgroundColor === 'white'"
      [style.margin-bottom]="marginBottom"
      [style.margin-top]="marginTop"
      [style.padding-top]="paddingTop"
      [style.padding-bottom]="paddingBottom"
      [style.padding-left]="paddingLeft"
      [style.padding-right]="paddingRight">
      <div
        class="menu-container"
        [class.visible]="isVisible">
        <div
          class="menu-inner-container">
          <ng-content></ng-content>
        </div>
      </div>
    </div>`
})
export class SecondaryNavigationComponent extends BaseComponent {
  public animationState: string = 'out';
  public isVisible: boolean = false;

  @Input() public backgroundColor: string = 'white';
  @Input() public marginBottom: string = '0';
  @Input() public marginTop: string = '60px'; // App-navbar always visible
  @Input() public paddingLeft: string = '7%';
  @Input() public paddingRight: string = '7%';
  @Input() public paddingTop: string = '7%';
  @Input() public paddingBottom: string = '7%';
  @Input('navIsVisible')
  set navIsVisible(value: boolean) {
    this.isVisible = value;
    this.toggleVisibility();
  }

  public constructor(
    protected systemLanguagesResolver: SystemLanguagesResolver,
    protected userResolver: UserResolver,
  ) {
    super(systemLanguagesResolver, userResolver);
  }

  public toggleVisibility(): void {
    if (this.isVisible) {
      setTimeout(() => {
        this.isVisible = false;
      }, menuAnimationDuration);
      this.animationState = 'out';
    } else {
      this.isVisible = true;
      this.animationState = 'in';
    }
  }
}
