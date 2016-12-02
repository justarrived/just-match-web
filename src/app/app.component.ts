import {Component, OnInit} from "@angular/core";
import {AuthManager} from "./services/auth-manager.service";
import {ActsAsUser} from "./services/acts-as-user.service";
import {
  Router,
  NavigationStart,
  RoutesRecognized,
  NavigationCancel,
  NavigationEnd,
  NavigationError
} from "@angular/router";
import {User} from "./models/user";
import {TranslationService} from "./services/translation.service";
import {Language} from "./models/language/language";
import {UserManager} from "./services/user-manager.service";
import {SystemLanguagesService} from "./services/system-languages.service";

@Component({
  selector: 'app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [SystemLanguagesService]
})
export class AppComponent implements OnInit {
  states: Array<String> = [];
  currentState: string;
  user: User;
  isCompanyUser: boolean;
  systemLanguages: Language[];
  selectedLanguage: Language;
  isNavigationMenuVisible: boolean = false;
  isLanguageMenuVisible: boolean = false;

  constructor(private router: Router,
              private authManager: AuthManager,
              private userManager: UserManager,
              private actsAsUser: ActsAsUser,
              private systemLanguagesService: SystemLanguagesService,
              public translationService: TranslationService
  ) {
    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.isNavigationMenuVisible = false;
      }

      if (event instanceof NavigationEnd) {
        this.currentState = router.url;
        this.states.push(router.url);
      }

      if (event instanceof NavigationCancel) {
        console.log('NavigationCancel');
      }

      if (event instanceof NavigationError) {
        console.log('NavigationError', event);
      }

      if (event instanceof RoutesRecognized) {
        console.log('RoutesRecognized');
      }
    });

    this.systemLanguagesService.getSystemLanguages().then(result => this.systemLanguages = result);
    this.selectedLanguage = this.translationService.getSelectedLanguage();
  }

  ngOnInit() {
    console.log("Application component initialized ...");
    this.authManager.authenticateIfNeeded().then(result => {
      this.router.initialNavigation();
      this.user = result;
    });

    this.authManager.getUserChangeEmmiter().subscribe(user => {
      this.isCompanyUser = this.userManager.isCompanyUser();
      this.user = user;
    });
  }

  onBodyClick(event) {
    let targetClasses = event.target.classList;
    if ((targetClasses.contains('overbody-container') || targetClasses.contains('menu-side-bar')) && (this.isNavigationMenuVisible || this.isLanguageMenuVisible)) {
      this.isNavigationMenuVisible = false;
      this.isLanguageMenuVisible = false;
    }
  }

  onNavigationMenuButtonClick() {
    this.isLanguageMenuVisible = false;
    this.isNavigationMenuVisible = !this.isNavigationMenuVisible;
  }

  onLanguageMenuButtonClick() {
    this.isNavigationMenuVisible = false;
    this.isLanguageMenuVisible = !this.isLanguageMenuVisible;
  }

  onSelectLanguage(language: Language) {
    this.isLanguageMenuVisible = false;
    this.selectedLanguage = language;
    this.translationService.setLanguage(language);
  }

  onBackButtonClick() {
    this.states.pop();
    this.router.navigate([this.states.pop()]);
  }

  onLogoutButtonClick() {
    this.authManager.logoutUser();
    this.router.navigate(['/home']);
  }

  get isSideMenuVisible(): boolean {
    return this.isNavigationMenuVisible || this.isLanguageMenuVisible;
  }

  get languageBtnIconClassName(): string {
    return this.isLanguageMenuVisible ? 'fa-caret-up' : 'fa-caret-down';
  }
}
