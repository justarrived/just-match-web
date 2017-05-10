import {Component} from '@angular/core';
import {ConfirmationModalComponent} from '../confirmation-modal/confirmation-modal.component';
import {OnDestroy} from '@angular/core';
import {OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {User} from '../../../models/api-models/user/user';
import {UserResolver} from '../../../resolvers/user/user.resolver';
import {ViewChild} from '@angular/core';

@Component({
  selector: 'registered-modal',
  template: `
    <confirmation-modal
      [description]="'registered.modal.description' | translate"
      [header]="'registered.modal.title' | translate: {username: user?.firstName}"
      icon="massive pink check"
      #confirmationModal>
    </confirmation-modal>`
})
export class RegisteredModalComponent implements OnInit, OnDestroy {
  @ViewChild('confirmationModal') public confirmationModal: ConfirmationModalComponent;

  public user: User;

  private userSubscription: Subscription;

  public constructor(
    private userResolver: UserResolver
  ) {
  }

  public ngOnInit(): void {
    this.initUser();
  }

  private initUser(): void {
    this.user = this.userResolver.getUser();
    this.userSubscription = this.userResolver.getUserChangeEmitter().subscribe(user => {
      this.user = user;
    });
  }

  public ngOnDestroy(): void {
    if (this.userSubscription) { this.userSubscription.unsubscribe(); }
  }

  public show() {
    this.confirmationModal.show({
      autofocus: false,
      transition: 'horizontal flip'
    });
  }

  public hide() {
    this.confirmationModal.hide();
  }
}
