import {ApiErrors} from '../../../models/api-models/api-errors/api-errors';
import {BaseComponent} from '../../base.component';
import {Component} from '@angular/core';
import {Input} from '@angular/core';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
import {UserResolver} from '../../../resolvers/user/user.resolver';

@Component({
  selector: 'input-hint-label',
  template: `
    <div
      *ngIf="hint"
      style="text-align: center">
      <div class="ui pointing blue {{pointingDirection}} label">
      <basic-text
        [text]="hint"
        textAlignmentLtr="center"
        textAlignmentRtl="center"
        fontSize="small"
        fontWeight="bold"
        marginBottom="0"
        marginTop="0">
      </basic-text>
      <ng-content></ng-content>
      </div>
    </div>`
})
export class InputHintLabelComponent extends BaseComponent {
  @Input() public hint: string;
  @Input() public pointingDirection: string; // Default to up. Should be one of below, right, left

  public constructor(
    protected systemLanguagesResolver: SystemLanguagesResolver,
    protected userResolver: UserResolver,
  ) {
    super(systemLanguagesResolver, userResolver);
  }
}
