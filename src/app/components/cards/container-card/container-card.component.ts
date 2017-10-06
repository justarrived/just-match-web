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
  selector: 'container-card',
  template: `
    <div
      [@fadeInAnimation]="animationState"
      class="ui raised card"
      [style.padding]="padding"
      [style.width]="width">
      <ng-content></ng-content>
    </div>`

})
export class ContainerCardComponent extends BaseComponent {
  @Input() public animationDelay: number = 1;
  @Input() public padding: string = '15px';
  @Input() public width: string = '100%';

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
