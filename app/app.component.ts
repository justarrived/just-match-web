import {Component, OnInit} from "@angular/core";
import {AuthManager} from "./services/auth-manager.service";
import {Router, NavigationStart, RoutesRecognized, NavigationCancel, NavigationEnd, NavigationError} from "@angular/router";
import {User} from "./models/user";
import {TranslationService} from "./services/translation.service";
import {Language} from "./models/language/language";
import {UserManager} from "./user-manager.service";
import {SystemLanguagesService} from "./services/system-languages.service";

@Component({
  moduleId: module.id,
  selector: 'app',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
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
    this.isNavigationMenuVisible = true;
  }

  onLanguageMenuButtonClick() {
    this.isLanguageMenuVisible = true;
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
}
