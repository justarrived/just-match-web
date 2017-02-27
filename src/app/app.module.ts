import {NgModule, ErrorHandler } from '@angular/core';
import {NgSemanticModule} from 'ng-semantic-ja/ng-semantic';
import {HttpModule} from '@angular/http';
import {BrowserModule} from '@angular/platform-browser';
import * as Raven from 'raven-js';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AgmCoreModule} from 'angular2-google-maps/core';
import {AppComponent} from './app.component';
import {HomeComponent} from './views/home/home.component';
import {DataStore} from './services/data-store.service';
import {ApiCall} from './services/api-call.service';
import {AuthManager} from './services/auth-manager.service';
import {UserProxy} from './services/proxy/user-proxy.service';
import {ActsAsUser} from './services/acts-as-user.service';
import {TranslationService} from './services/translation.service';
import {NavigationService} from './services/navigation.service';
import {SliderComponent} from './components/slider/slider.component';
import {UserRegisterComponent} from './views/user/user-register/user-register.component';
import {CountryProxy} from './services/proxy/country-proxy.service';
import {DeletableItemComponent} from './components/autocomplete-dropdown/deletable-item/deletable-item.component';
import {AutocompleteDropdownListItemComponent} from './components/autocomplete-dropdown/autocomplete-dropdown-list-item/autocomplete-dropdown-list-item.component';
import {AutocompleteDropdownComponent} from './components/autocomplete-dropdown/autocomplete-dropdown.component';
import {LanguageProxy} from './services/proxy/language-proxy.service';
import {SkillProxy} from './services/proxy/skill-proxy.service';
import {LoginComponent} from './views/login/login.component';
import {ForgotPasswordComponent} from './views/forgot-password/forgot-password.component';
import {ResetPasswordComponent} from './views/reset-password/reset-password.component';
import {UserManager} from './services/user-manager.service';
import {JobPreviewComponent} from './components/job-preview/job-preview.component';
import {JobsComponent} from './views/jobs/jobs.component';
import {JobListItemComponent} from './components/job-list-item/job-list-item.component';
import {JobMapMarkerComponent} from './components/job-map-marker/job-map-marker.component';
import {PagerComponent} from './components/pager/pager.component';
import {JobDetailsComponent} from './views/job-details/job-details.component';
import {CommentsComponent} from './components/comments/comments.component';
import {FaqComponent} from './views/faq/faq.component';
import {ContactComponent} from './views/contact/contact.component';
import {ConfirmationComponent} from './views/confirmation/confirmation.component';
import {CookiesAboutComponent} from './views/cookies-about/cookies-about.component';
import {CookieBarComponent} from './components/cookie-bar/cookie-bar.component';
import {LoadingComponent} from './components/loading-gif/loading.component';
import {MyJobsComponent} from './views/my-jobs/my-jobs.component';
import {UserJobsComponent} from './views/my-jobs/user-jobs/user-jobs.component';
import {MyJobsItemComponent} from './components/my-jobs-item/my-jobs-item.component';
import {AppTranslateModule} from './app.translate.module';
import {AppRoutingModule} from './app.routing.module';
import {UserSettingsComponent} from './views/user/user-settings/user-settings.component';
import {UserProfileComponent} from './views/user/user-settings/user-profile/user-profile.component';
import {UserDetailsComponent} from './views/user/user-settings/user-details/user-details.component';
import {AutosizeDirective} from './components/textarea-autosize/textarea-autosize.directive';
import {Geolocation} from './services/geolocation.service';
import {ErrorComponent} from './views/error/error.component';
import {NotFoundComponent} from './views/404/404.component';
import {environment} from '../environments/environment';
import {JARoutes} from './routes/ja-routes';
import {TruncatePipe} from './utils/truncate';

Raven
  .config(environment.sentryURL)
  .install();

export class RavenErrorHandler implements ErrorHandler {
  handleError(error: any): void {
    Raven.captureException(error.originalError);
  }
}

@NgModule({
  imports: [
    BrowserModule,
    NgSemanticModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    AppTranslateModule,
    AppRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: environment.googleMapsKey
    })
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    SliderComponent,
    UserRegisterComponent,
    UserProfileComponent,
    UserDetailsComponent,
    DeletableItemComponent,
    AutocompleteDropdownListItemComponent,
    AutocompleteDropdownComponent,
    LoginComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    JobPreviewComponent,
    JobsComponent,
    JobListItemComponent,
    JobMapMarkerComponent,
    PagerComponent,
    JobDetailsComponent,
    CommentsComponent,
    FaqComponent,
    ContactComponent,
    ConfirmationComponent,
    CookiesAboutComponent,
    CookieBarComponent,
    LoadingComponent,
    MyJobsItemComponent,
    UserJobsComponent,
    MyJobsComponent,
    UserSettingsComponent,
    AutosizeDirective,
    ErrorComponent,
    NotFoundComponent,
    TruncatePipe
  ],
  providers: [
    DataStore,
    NavigationService,
    ApiCall,
    AuthManager,
    ActsAsUser,
    UserProxy,
    CountryProxy,
    LanguageProxy,
    SkillProxy,
    TranslationService,
    UserManager,
    Geolocation,
    { provide: ErrorHandler, useClass: RavenErrorHandler }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
