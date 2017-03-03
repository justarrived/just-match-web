import {ActsAsUser} from './services/acts-as-user.service';
import {AgmCoreModule} from 'angular2-google-maps/core';
import {ApiCall} from './services/api-call.service';
import {ApiErrorsComponent} from './components/form-parts/api-errors.component';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app.routing.module';
import {AppTranslateModule} from './app.translate.module';
import {AuthManager} from './services/auth-manager.service';
import {AutocompleteDropdownComponent} from './components/autocomplete-dropdown/autocomplete-dropdown.component';
import {AutocompleteDropdownListItemComponent} from './components/autocomplete-dropdown/autocomplete-dropdown-list-item/autocomplete-dropdown-list-item.component';
import {AutosizeDirective} from './components/textarea-autosize/textarea-autosize.directive';
import {BrowserModule} from '@angular/platform-browser';
import {CommentsComponent} from './components/comments/comments.component';
import {CommentsProxy} from './services/proxy/comments-proxy.service';
import {ConfirmationComponent} from './views/confirmation/confirmation.component';
import {ContactFormComponent} from './components/forms/contact-form/contact-form.component';
import {ContactPageComponent} from './views/contact/contact-page.component';
import {ContactProxy} from './services/proxy/contact-proxy.service';
import {CookieBarComponent} from './components/cookie-bar/cookie-bar.component';
import {CookiesAboutComponent} from './views/cookies-about/cookies-about.component';
import {CountryProxy} from './services/proxy/country-proxy.service';
import {DataStore} from './services/data-store.service';
import {DeletableItemComponent} from './components/autocomplete-dropdown/deletable-item/deletable-item.component';
import {environment} from '../environments/environment';
import {ErrorComponent} from './views/error/error.component';
import {ErrorHandler } from '@angular/core';
import {FaqComponent} from './views/faq/faq.component';
import {FaqProxy} from './services/proxy/faq-proxy.service';
import {ForgotPasswordFormComponent} from './components/forms/forgot-password-form/forgot-password-form.component';
import {ForgotPasswordPageComponent} from './views/forgot-password/forgot-password-page.component';
import {FormsModule} from '@angular/forms';
import {Geolocation} from './services/geolocation.service';
import {HomeComponent} from './views/home/home.component';
import {HttpModule} from '@angular/http';
import {InputErrorComponent} from './components/form-parts/input-error.component';
import {InputErrorsComponent} from './components/form-parts/input-errors.component';
import {JARoutes} from './routes/ja-routes';
import {JobDetailsComponent} from './views/job-details/job-details.component';
import {JobListItemComponent} from './components/job-list-item/job-list-item.component';
import {JobMapMarkerComponent} from './components/job-map-marker/job-map-marker.component';
import {JobPreviewComponent} from './components/job-preview/job-preview.component';
import {JobProxy} from './services/proxy/job-proxy.service';
import {JobsComponent} from './views/jobs/jobs.component';
import {LanguageProxy} from './services/proxy/language-proxy.service';
import {LoadingComponent} from './components/loading/loading.component';
import {LoginFormComponent} from './components/forms/login-form/login-form.component';
import {LoginPageComponent} from './views/login/login-page.component';
import {MyJobsComponent} from './views/my-jobs/my-jobs.component';
import {MyJobsItemComponent} from './components/my-jobs-item/my-jobs-item.component';
import {NavigationService} from './services/navigation.service';
import {NgModule} from '@angular/core';
import {NgSemanticModule} from 'ng-semantic-ja/ng-semantic';
import {NotFoundComponent} from './views/404/404.component';
import {PagerComponent} from './components/pager/pager.component';
import {ReactiveFormsModule} from '@angular/forms';
import {RegisterFormComponent} from './components/forms/register-form/register-form.component';
import {RegisterPageComponent} from './views/register/register-page.component';
import {ResetPasswordFormComponent} from './components/forms/reset-password-form/reset-password-form.component';
import {ResetPasswordPageComponent} from './views/reset-password/reset-password-page.component';
import {SkillProxy} from './services/proxy/skill-proxy.service';
import {SliderComponent} from './components/slider/slider.component';
import {SystemLanguagesService} from './services/system-languages.service';
import {TranslationService} from './services/translation.service';
import {TruncatePipe} from './utils/truncate';
import {UserDetailsComponent} from './views/user/user-settings/user-details/user-details.component';
import {UserJobsComponent} from './views/my-jobs/user-jobs/user-jobs.component';
import {UserManager} from './services/user-manager.service';
import {UserProfileComponent} from './views/user/user-settings/user-profile/user-profile.component';
import {UserProfileFormComponent} from './components/forms/user-profile-form/user-profile-form.component';
import {UserProxy} from './services/proxy/user-proxy.service';
import {UserSettingsComponent} from './views/user/user-settings/user-settings.component';
import * as Raven from 'raven-js';

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
    ApiErrorsComponent,
    AppComponent,
    AutocompleteDropdownComponent,
    AutocompleteDropdownListItemComponent,
    AutosizeDirective,
    CommentsComponent,
    ConfirmationComponent,
    ContactFormComponent,
    ContactPageComponent,
    CookieBarComponent,
    CookiesAboutComponent,
    DeletableItemComponent,
    ErrorComponent,
    FaqComponent,
    ForgotPasswordPageComponent,
    ForgotPasswordFormComponent,
    HomeComponent,
    InputErrorComponent,
    InputErrorsComponent,
    JobDetailsComponent,
    JobListItemComponent,
    JobMapMarkerComponent,
    JobPreviewComponent,
    JobsComponent,
    LoadingComponent,
    LoginPageComponent,
    LoginFormComponent,
    MyJobsComponent,
    MyJobsItemComponent,
    NotFoundComponent,
    PagerComponent,
    RegisterFormComponent,
    ResetPasswordPageComponent,
    ResetPasswordFormComponent,
    RegisterPageComponent,
    SliderComponent,
    TruncatePipe,
    UserDetailsComponent,
    UserJobsComponent,
    UserProfileComponent,
    UserProfileFormComponent,
    UserSettingsComponent
  ],
  providers: [
    DataStore,
    NavigationService,
    SystemLanguagesService,
    ApiCall,
    AuthManager,
    ActsAsUser,
    CommentsProxy,
    ContactProxy,
    CountryProxy,
    FaqProxy,
    JobProxy,
    LanguageProxy,
    SkillProxy,
    UserProxy,
    TranslationService,
    UserManager,
    Geolocation,
    { provide: ErrorHandler, useClass: RavenErrorHandler }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
