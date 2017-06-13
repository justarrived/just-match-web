import {BaseComponent} from '../../base.component';
import {Component} from '@angular/core';
import {Input} from '@angular/core';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
import {UserResolver} from '../../../resolvers/user/user.resolver';

@Component({
  selector: 'input-error',
  template: `
    <div
      *ngIf="visible"
      class="ui pointing red basic label">
      {{label}}
    </div>`
})
export class InputErrorComponent extends BaseComponent {
  @Input() public label: string;
  @Input() public visible: boolean = true;

  public constructor(
    protected systemLanguagesResolver: SystemLanguagesResolver,
    protected userResolver: UserResolver,
  ) {
    super(systemLanguagesResolver, userResolver);
  }

  public hideError(): void {
    this.visible = false;
  }

  public showError(): void {
    this.visible = true;
  }
}
