import {ActsAsUser} from './services/acts-as-user.service';
import {AuthManager} from './services/auth-manager.service';
import {Component} from '@angular/core';
import {HostListener} from '@angular/core';
import {JARoutes} from './routes/ja-routes';
import {Language} from './models/language/language';
import {NavigationService} from './services/navigation.service';
import {NavigationStart} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {OnDestroy} from '@angular/core';
import {OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {TranslationService} from './services/translation.service';
import {User} from './models/user';
import {UserManager} from './services/user-manager.service';

@Component({
  selector: 'app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  private user: User;
  private isNavigationMenuVisible: boolean = false;
  private isLanguageMenuVisible: boolean = false;
  private JARoutes = JARoutes;

  private userChangeSubscription1: Subscription;
  private userChangeSubscription2: Subscription;

  constructor(
    private router: Router,
    private navigationService: NavigationService,
    private authManager: AuthManager,
    private userManager: UserManager,
    private actsAsUser: ActsAsUser,
    private translationService: TranslationService
  ) {
    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.isNavigationMenuVisible = false;
      }
    });
  }

  public ngOnInit() {
    this.authManager.authenticateIfNeeded().then(result => {
      this.router.initialNavigation();
      this.user = result;
    });

    this.userChangeSubscription1 = this.authManager.getUserChangeEmmiter().subscribe(user => {
      this.user = user;
    });

    this.userChangeSubscription2 = this.userManager.getUserChangeEmmiter().subscribe(user => {
      this.user = user;
    });
  }

  public ngOnDestroy() {
    this.userChangeSubscription1.unsubscribe();
    this.userChangeSubscription2.unsubscribe();
  }

  public onStaffingTimeReportButtonClick() {
    window.location.href = 'https://justarrived-se.web.intelliplan.eu/croupier/login/';
    this.isNavigationMenuVisible = false;
  }

  private onBodyClick(event) {
    let targetClasses = event.target.classList;
    if ((targetClasses.contains('overbody-container') || targetClasses.contains('menu-side-bar')) && (this.isNavigationMenuVisible || this.isLanguageMenuVisible)) {
      this.isNavigationMenuVisible = false;
      this.isLanguageMenuVisible = false;
    }
  }

  private onLogoutButtonClick() {
    this.navigationService.navigate(JARoutes.home);
    this.authManager.logoutUser();
    this.isLanguageMenuVisible = false;
  }

  get isSideMenuVisible(): boolean {
    return this.isNavigationMenuVisible || this.isLanguageMenuVisible;
  }

  get canStaffingTimeReport(): boolean {
    return this.user && (this.user.justArrivedStaffing || this.user.admin);
  }

  get languageBtnIconClassName(): string {
    return this.isLanguageMenuVisible ? 'fa-caret-up' : 'fa-caret-down';
  }

  get profileImagePath(): string {
    if (this.user.profile_image && this.user.profile_image.mediumImageUrl) {
      return this.user.profile_image.mediumImageUrl;
    } else {
      return '/assets/images/placeholder-profile-image.png';
    }
  }
}
