import {Component} from '@angular/core';
import {Input} from '@angular/core';
import {JARoutes} from '../../../routes/ja-routes/ja-routes';
import {Language} from '../../../models/api-models/language/language';
import {OnDestroy} from '@angular/core';
import {OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
import {User} from '../../../models/api-models/user/user';
import {UserResolver} from '../../../resolvers/user/user.resolver';

@Component({
  selector: 'welcome-header',
  template: `
    <div class="welcome-header-container">
      <div
        class="welcome-header-info-container">
        <welcome-user-title [name]="userFirstName"></welcome-user-title>

        <basic-title-text
          [text]="'home.header.logged.out.sub.title' | translate"
          color="white"
          fontSize="small"
          textAlignmentLtr="left"
          textAlignmentLtrTablet="center"
          textAlignmentRtl="right"
          textAlignmentRtlTablet="center">
        </basic-title-text>

        <basic-text
          [text]="'home.header.logged.out.description' | translate"
          color="white"
          textAlignmentLtr="left"
          textAlignmentLtrTablet="center"
          textAlignmentRtl="right"
          textAlignmentRtlTablet="center">
        </basic-text>

        <div
          [style.display]="'flex'"
          [style.direction]="systemLanguage.direction"
          class="welcome-header-button-outer-container">
          <div
            class="welcome-header-button-container">
            <welcome-user-cta [isLoggedIn]="isLoggedIn"></welcome-user-cta>
          </div>
        </div>
      </div>
    </div>`,
  styleUrls: ['./welcome-header.component.scss']
})
export class WelcomeHeaderComponent implements OnInit, OnDestroy {
  public JARoutes = JARoutes;
  public systemLanguage: Language;
  public user: User;

  private systemLanguageSubscription: Subscription;
  private userSubscription: Subscription;

  public constructor(
    private systemLanguagesResolver: SystemLanguagesResolver,
    private userResolver: UserResolver
  ) {
  }

  public ngOnInit(): void {
    this.initSystemLanguage()
    this.initUser();
  }

  private initSystemLanguage(): void {
    this.systemLanguage = this.systemLanguagesResolver.getSelectedSystemLanguage();
    this.systemLanguageSubscription = this.systemLanguagesResolver.getSystemLanguageChangeEmitter().subscribe(systemLanguage => {
      this.systemLanguage = systemLanguage;
    });
  }

  private initUser(): void {
    this.user = this.userResolver.getUser();
    this.userSubscription = this.userResolver.getUserChangeEmitter().subscribe(user => {
      this.user = user;
    });
  }

  public ngOnDestroy(): void {
    if (this.userSubscription) { this.userSubscription.unsubscribe(); }
    if (this.systemLanguageSubscription) { this.systemLanguageSubscription.unsubscribe(); }
  }

  get isLoggedIn(): boolean {
    if (this.user) {
      return true;
    } else {
      return false;
    }
  }

  get userFirstName(): string {
    if (!this.user) return null;

    return this.user.firstName;
  }
}
