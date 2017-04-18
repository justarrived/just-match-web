import {Component} from '@angular/core';
import {Input} from '@angular/core';
import {SemanticMessageComponent} from '../../../semantic/message/message'
import {UserMissingTraitsNextFormComponent} from '../../forms/user-missing-traits-next-form/user-missing-traits-next-form.component'
import {ViewChild} from '@angular/core';

@Component({
  selector: 'user-missing-traits-message',
  template: `
  <sm-message
    [closeable]="true"
    [style.display]="userMissingTraitsNextFormComponent.missingUserTraitsKeys.length > 0 ? 'block' : 'none'">
    <div class="ui form">
      <div class="ui basic center aligned segment">
        <h2>
          {{'user.missing.traits.message.header' | translate}}
        </h2>
        <p>
          {{'user.missing.traits.message.description' | translate}}
        </p>
        <div class="ui centered grid">
          <div class="fourteen wide phone ten wide tablet eight wide computer column">
            <form class="ui form">
              <user-missing-traits-next-form
                [isInModal]="false"
                (onClose)="close()">
              </user-missing-traits-next-form>
            </form>
          </div>
        </div>
      </div>
    </div>
  </sm-message>`
})
export class UserMissingTraitsMessageComponent {
  @ViewChild(SemanticMessageComponent) semanticMessageComponent: SemanticMessageComponent;
  @ViewChild(UserMissingTraitsNextFormComponent) userMissingTraitsNextFormComponent: UserMissingTraitsNextFormComponent;

  public close() {
    this.semanticMessageComponent.close();
  }
}
