import {Component, OnInit} from '@angular/core';
import {AuthManager} from './services/auth-manager.service';
import {NavigationService} from './services/navigation.service';
import {ActsAsUser} from './services/acts-as-user.service';
import {Router, NavigationStart} from '@angular/router';
import {User} from './models/user';
import {TranslationService} from './services/translation.service';
import {Language} from './models/language/language';
import {UserManager} from './services/user-manager.service';
import {SystemLanguagesService} from './services/system-languages.service';
import {JARoutes} from './routes/ja-routes';

@Component({
  selector: 'app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private user: User;
  private systemLanguages: Language[];
  private selectedLanguage: Language;
  private isNavigationMenuVisible: boolean = false;
  private isLanguageMenuVisible: boolean = false;
  private JARoutes = JARoutes;

  constructor(
    private router: Router,
    private navigationService: NavigationService,
    private authManager: AuthManager,
    private userManager: UserManager,
    private actsAsUser: ActsAsUser,
    private systemLanguagesService: SystemLanguagesService,
    private translationService: TranslationService
  ) {
    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.isNavigationMenuVisible = false;
      }
    });

    this.systemLanguagesService.getSystemLanguages().then(result => this.systemLanguages = result);
    this.selectedLanguage = this.translationService.getSelectedLanguage();
  }

  ngOnInit() {
    this.authManager.authenticateIfNeeded().then(result => {
      this.router.initialNavigation();
      this.user = result;
    });

    this.authManager.getUserChangeEmmiter().subscribe(user => {
      this.user = user;
    });

    this.userManager.getUserChangeEmmiter().subscribe(user => {
      this.user = user;
    });
  }

  private onBodyClick(event) {
    let targetClasses = event.target.classList;
    if ((targetClasses.contains('overbody-container') || targetClasses.contains('menu-side-bar')) && (this.isNavigationMenuVisible || this.isLanguageMenuVisible)) {
      this.isNavigationMenuVisible = false;
      this.isLanguageMenuVisible = false;
    }
  }

  private onNavigationMenuButtonClick() {
    this.isLanguageMenuVisible = false;
    this.isNavigationMenuVisible = !this.isNavigationMenuVisible;
  }

  private onLanguageMenuButtonClick() {
    this.isNavigationMenuVisible = false;
    this.isLanguageMenuVisible = !this.isLanguageMenuVisible;
  }

  private onSelectLanguage(language: Language) {
    this.isLanguageMenuVisible = false;
    this.selectedLanguage = language;
    this.translationService.setLanguage(language);
    this.authManager.authenticateIfNeeded();
  }

  private onLogoutButtonClick() {
    this.navigationService.navigate(JARoutes.home);
    this.authManager.logoutUser();
    this.isLanguageMenuVisible = false;
  }

  private isActiveSystemLanguage(language: Language): boolean {
    return this.translationService.getSelectedLanguage().languageCode === language.languageCode;
  }

  get isSideMenuVisible(): boolean {
    return this.isNavigationMenuVisible || this.isLanguageMenuVisible;
  }

  get languageBtnIconClassName(): string {
    return this.isLanguageMenuVisible ? 'fa-caret-up' : 'fa-caret-down';
  }

  get profileImagePath(): string {
    if(this.user.profile_image && this.user.profile_image.mediumImageUrl) {
      return this.user.profile_image.mediumImageUrl;
    } else {
      return '/assets/images/placeholder-profile-image.png';
    }
  }
}
