import {Component} from '@angular/core';
import {Input} from '@angular/core';
import {OnDestroy} from '@angular/core';
import {OnInit} from '@angular/core';
import {SemanticMessageComponent} from '../../../semantic/message/message'
import {Subscription} from 'rxjs/Subscription';
import {User} from '../../../models/api-models/user/user';
import {UserMissingTraitsNextFormComponent} from '../../forms/user-missing-traits-next-form/user-missing-traits-next-form.component'
import {UserResolver} from '../../../resolvers/user/user.resolver';
import {ViewChild} from '@angular/core';

@Component({
  selector: 'user-missing-traits-message',
  template: `
  <sm-message
    [closeable]="true"
    [style.display]="userMissingTraitsNextFormComponent?.missingUserTraitsKeys?.length > 0 ? 'block' : 'none'"
    *ngIf="user">
    <div class="ui basic center aligned segment">
      <h2>
        {{'user.missing.traits.message.header' | translate}}
      </h2>
      <p>
        {{'user.missing.traits.message.description' | translate}}
      </p>
      <div class="ui centered grid">
        <div class="fourteen wide phone ten wide tablet eight wide computer column">
          <user-missing-traits-next-form
            [isInModal]="false"
            (onClose)="close()">
          </user-missing-traits-next-form>
        </div>
      </div>
    </div>
  </sm-message>`
})
export class UserMissingTraitsMessageComponent implements OnInit, OnDestroy {
  @ViewChild(SemanticMessageComponent) public semanticMessageComponent: SemanticMessageComponent;
  @ViewChild(UserMissingTraitsNextFormComponent) public userMissingTraitsNextFormComponent: UserMissingTraitsNextFormComponent;

  public user: User;

  private userSubscription: Subscription;

  public constructor(
    private userResolver: UserResolver,
  ) {
  }

  public ngOnInit() {
    this.initUser();
  }

  private initUser() {
    this.user = this.userResolver.getUser();
    this.userSubscription = this.userResolver.getUserChangeEmitter().subscribe(user => {
      this.user = user;
    });
  }

  public ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  public close() {
    this.semanticMessageComponent.close();
  }
}
