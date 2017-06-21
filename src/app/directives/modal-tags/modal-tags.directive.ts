import {BaseComponent} from '../../components/base.component';
import {Directive} from '@angular/core';
import {SystemLanguagesResolver} from '../../resolvers/system-languages/system-languages.resolver';
import {UserResolver} from '../../resolvers/user/user.resolver';

@Directive({ selector: 'modal-content, modal-actions' })
export class ModalTagsDirective extends BaseComponent {
  // No behavior
  // The only purpose is to "declare" the tag in Angular

  public constructor(
    protected systemLanguagesResolver: SystemLanguagesResolver,
    protected userResolver: UserResolver,
  ) {
    super(systemLanguagesResolver, userResolver);
  }
}
