import {BaseComponent} from '../../base.component';
import {Component} from '@angular/core';
import {Input} from '@angular/core';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
import {UserResolver} from '../../../resolvers/user/user.resolver';

@Component({
  selector: 'basic-border-section',
  styleUrls: ['./basic-border-section.component.scss'],
  template: `
  <div class="ui basic center aligned segment basic-border-section-container">
    <basic-title-text
      [iconLeft]="icon"
      [text]="header"
      color="white"
      fontSize="large"
      marginTop="1rem"
      textAlignmentLtr="center"
      textAlignmentRtl="center">
    </basic-title-text>
  </div>`
})
export class BasicBorderSectionComponent extends BaseComponent {
  @Input() header: string;
  @Input() icon: string;

  public constructor(
    protected systemLanguagesResolver: SystemLanguagesResolver,
    protected userResolver: UserResolver,
  ) {
    super(systemLanguagesResolver, userResolver);
  }
}
