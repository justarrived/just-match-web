import {Component} from '@angular/core';
import {DataStoreService} from '../../../services/data-store.service';
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
    (onClosed)="closed()"
    [closeable]="true"
    [style.display]="userMissingTraitsNextFormComponent?.missingUserTraitsKeys?.length > 0 ? 'block' : 'none'"
    *ngIf="user && !suspended">
    <div class="ui basic center aligned segment">
      <basic-title-text
        [text]="'user.missing.traits.message.header' | translate"
        fontSize="huge"
        textAlignmentLtr="center"
        textAlignmentRtl="center">
      </basic-title-text>
      <basic-text
        [text]="'user.missing.traits.message.description' | translate"
        textAlignmentLtr="center"
        textAlignmentRtl="center">
      </basic-text>
      <div class="ui centered grid">
        <div class="sixteen wide mobile ten wide tablet eight wide computer column">
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

  public suspended: boolean;
  public user: User;

  private userSubscription: Subscription;
  private readonly userMissingTraitsMessageSuspendedUntilKey: string = 'userMissingTraitsMessageSuspendedUntilKey';
  private readonly suspensionHours: number = 3;

  public constructor(
    private dataStoreService: DataStoreService,
    private userResolver: UserResolver,
  ) {
  }

  public ngOnInit(): void {
    this.initUser();
    this.initSuspended();
  }

  private initUser(): void {
    this.user = this.userResolver.getUser();
    this.userSubscription = this.userResolver.getUserChangeEmitter().subscribe(user => {
      this.user = user;
    });
  }

  private initSuspended(): void {
    let suspendedUntil = new Date(this.dataStoreService.get(this.userMissingTraitsMessageSuspendedUntilKey));
    if (suspendedUntil && new Date() < suspendedUntil) {
      this.suspended = true;
    }
  }

  public ngOnDestroy() : void{
    if (this.userSubscription) { this.userSubscription.unsubscribe(); }
  }

  public close(): void {
    this.semanticMessageComponent.close();
  }

  public closed(): void {
    let suspendedUntil = new Date();
    suspendedUntil.setHours(suspendedUntil.getHours() + this.suspensionHours);
    this.dataStoreService.set(this.userMissingTraitsMessageSuspendedUntilKey, suspendedUntil);
  }
}
