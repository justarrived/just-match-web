import {BaseComponent} from '../../base.component';
import {Component} from '@angular/core';
import {Input} from '@angular/core';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
import {UserResolver} from '../../../resolvers/user/user.resolver';

@Component({
  selector: 'circular-icon-base-button',
  template: `
    <button
      [disabled]="disabled"
      [class.icon]="icon"
      class="ui circular {{color}} {{icon}} button"
      [type]="buttonType"
      style="padding: 10px;">
      <i *ngIf="icon" class="icon inverted {{icon}}" style="margin: 0"></i>
    </button>`
})
export class CircularIconBaseButtonComponent extends BaseComponent {
  @Input() public disabled: boolean = false;
  @Input() public color: string;
  @Input() public icon: string;
  @Input() public buttonType: string = 'button'; // One of ['button', 'submit', 'reset']

  public constructor(
    protected systemLanguagesResolver: SystemLanguagesResolver,
    protected userResolver: UserResolver,
  ) {
    super(systemLanguagesResolver, userResolver);
  }
}
