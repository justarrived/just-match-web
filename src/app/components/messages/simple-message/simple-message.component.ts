import {BaseComponent} from '../../base.component';
import {Component} from '@angular/core';
import {Input} from '@angular/core';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
import {UserResolver} from '../../../resolvers/user/user.resolver';

@Component({
  selector: 'simple-message',
  template: `
  <sm-message
    [class]="type"
    [closeable]="closeable"
    [icon]="icon">
    <div class="content">
      <basic-title-text
        [text]="header"
        fontSize="small"
        marginTop="0"
        marginBottom="0">
      </basic-title-text>
      <basic-text
        [text]="description"
        marginTop="0"
        marginBottom="0">
      </basic-text>
    </div>
  </sm-message>`
})
export class SimpleMessageComponent extends BaseComponent {
  @Input() public closeable: boolean;
  @Input() public description: string;
  @Input() public header: string;
  @Input() public icon: string;
  @Input() public type: string;

  public constructor(
    protected systemLanguagesResolver: SystemLanguagesResolver,
    protected userResolver: UserResolver,
  ) {
    super(systemLanguagesResolver, userResolver);
  }
}
