import {BaseComponent} from '../../base.component';
import {Component} from '@angular/core';
import {Input} from '@angular/core';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
import {UserResolver} from '../../../resolvers/user/user.resolver';

@Component({
  selector: 'info-message',
  template: `
  <simple-message
    [closeable]="closeable"
    [description]="description"
    [header]="header"
    [icon]="icon"
    type="info">
  </simple-message>`
})
export class InfoMessageComponent extends BaseComponent {
  @Input() public closeable: boolean;
  @Input() public description: string;
  @Input() public header: string;
  @Input() public icon: string;

  public constructor(
    protected systemLanguagesResolver: SystemLanguagesResolver,
    protected userResolver: UserResolver,
  ) {
    super(systemLanguagesResolver, userResolver);
  }
}
