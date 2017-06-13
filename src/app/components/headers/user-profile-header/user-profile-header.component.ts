import {BaseComponent} from '../../base.component';
import {Component} from '@angular/core';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
import {UserResolver} from '../../../resolvers/user/user.resolver';

@Component({
  selector: 'user-profile-header',
  styleUrls: ['./user-profile-header.component.scss'],
  template: `
  <div class="ui centered grid user-profile-header-container">
    <div class="fourteen wide mobile ten wide tablet eight wide computer column">
      <div class="ui basic segment">
        <profile-image-input
          [centered]="true"
          size="small">
        </profile-image-input>
      </div>
      <basic-title-text
        [text]="user.name"
        [underlineBelow]="true"
        color="white"
        fontSize="large"
        textAlignmentLtr="center"
        textAlignmentRtl="center"
        underlineBelowColor="white"
        underlineBelowLtrAlignment="center"
        underlineBelowRtlAlignment="center">
      </basic-title-text>
      <basic-text
        [text]="'user.profile.header.information' | translate"
        color="white"
        fontSize="large"
        textAlignmentLtr="center"
        textAlignmentRtl="center">
      </basic-text>
    </div>
  </div>`
})
export class UserProfileHeaderComponent extends BaseComponent {

  public constructor(
    protected systemLanguagesResolver: SystemLanguagesResolver,
    protected userResolver: UserResolver,
  ) {
    super(systemLanguagesResolver, userResolver);
  }
}
