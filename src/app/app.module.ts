import {AccountNumberInputComponent} from './components/inputs/account-number-input/account-number-input.component';
import {ActsAsUser} from './services/acts-as-user.service';
import {AddressInputComponent} from './components/inputs/address-input/address-input.component';
import {AgmCoreModule} from 'angular2-google-maps/core';
import {ApiCall} from './services/api-call.service';
import {ApiErrorsComponent} from './components/form-errors/api-errors/api-errors.component';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app.routing.module';
import {AppTranslateModule} from './app.translate.module';
import {AuthManager} from './services/auth-manager.service';
import {AutosizeDirective} from './directives/textarea-autosize/textarea-autosize.directive';
import {BankAccountInputComponent} from './components/inputs/bank-account-input/bank-account-input.component';
import {BaseMessageComponent} from './components/messages/base-message.component';
import {BasicBorderHeaderComponent} from './components/headers/basic-border-header/basic-border-header.component';
import {BrowserModule} from '@angular/platform-browser';
import {CityInputComponent} from './components/inputs/city-input/city-input.component';
import {ClearingNumberInputComponent} from './components/inputs/clearing-number-input/clearing-number-input.component';
import {CommentsComponent} from './components/comments/comments.component';
import {CommentsProxy} from './services/proxy/comments-proxy.service';
import {ConfirmationComponent} from './views/confirmation/confirmation.component';
import {ContactFormComponent} from './components/forms/contact-form/contact-form.component';
import {ContactPageComponent} from './views/contact/contact-page.component';
import {ContactProxy} from './services/proxy/contact-proxy.service';
import {CookieBarComponent} from './components/cookie-bar/cookie-bar.component';
import {CookiesAboutPageComponent} from './views/cookies-about/cookies-about-page.component';
import {CountryOfOriginInputComponent} from './components/inputs/country-of-origin-input/country-of-origin-input.component';
import {CountryProxy} from './services/proxy/country-proxy.service';
import {DataStore} from './services/data-store.service';
import {EmailInputComponent} from './components/inputs/email-input/email-input.component';
import {EmailOrPhoneInputComponent} from './components/inputs/email-or-phone-input/email-or-phone-input.component';
import {environment} from '../environments/environment';
import {ErrorHandler } from '@angular/core';
import {ErrorMessageComponent} from './components/messages/error-message/error-message.component';
import {ErrorPageComponent} from './views/error/error-page.component';
import {FaqAccordionComponent} from './components/accordions/faq-accordion/faq-accordion.component';
import {FaqPageComponent} from './views/faq/faq-page.component';
import {FaqProxy} from './services/proxy/faq-proxy.service';
import {FirstNameInputComponent} from './components/inputs/first-name-input/first-name-input.component';
import {ForgotPasswordFormComponent} from './components/forms/forgot-password-form/forgot-password-form.component';
import {ForgotPasswordPageComponent} from './views/forgot-password/forgot-password-page.component';
import {FormsModule} from '@angular/forms';
import {FormSubmitButtonComponent} from './components/buttons/form-submit-button/form-submit-button.component';
import {GenderInputComponent} from './components/inputs/gender-input/gender-input.component';
import {Geolocation} from './services/geolocation.service';
import {HomeComponent} from './views/home/home.component';
import {HttpModule} from '@angular/http';
import {InfoMessageComponent} from './components/messages/info-message/info-message.component';
import {InputErrorComponent} from './components/form-errors/input-error/input-error.component';
import {InputErrorsComponent} from './components/form-errors/input-errors/input-errors.component';
import {JARoutes} from './routes/ja-routes';
import {JobCardComponent} from './components/cards/job-card/job-card.component';
import {JobDetailsComponent} from './views/job-details/job-details.component';
import {JobListItemComponent} from './components/job-list-item/job-list-item.component';
import {JobMapMarkerComponent} from './components/job-map-marker/job-map-marker.component';
import {JobProxy} from './services/proxy/job-proxy.service';
import {JobsComponent} from './views/jobs/jobs.component';
import {LanguageProxy} from './services/proxy/language-proxy.service';
import {LastNameInputComponent} from './components/inputs/last-name-input/last-name-input.component';
import {LoadingComponent} from './components/loading/loading.component';
import {LoginFormComponent} from './components/forms/login-form/login-form.component';
import {LoginPageComponent} from './views/login/login-page.component';
import {MessageInputComponent} from './components/inputs/message-input/message-input.component';
import {MyJobsComponent} from './views/my-jobs/my-jobs.component';
import {MyJobsItemComponent} from './components/my-jobs-item/my-jobs-item.component';
import {NameInputComponent} from './components/inputs/name-input/name-input.component';
import {NavigationService} from './services/navigation.service';
import {NewPasswordInputComponent} from './components/inputs/new-password-input/new-password-input.component';
import {NgModule} from '@angular/core';
import {NgSemanticModule} from 'ng-semantic-ja/ng-semantic';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {NotFoundPageComponent} from './views/404/404-page.component';
import {OldPasswordInputComponent} from './components/inputs/old-password-input/old-password-input.component';
import {PagerComponent} from './components/pager/pager.component';
import {PasswordInputComponent} from './components/inputs/password-input/password-input.component';
import {PhoneInputComponent} from './components/inputs/phone-input/phone-input.component';
import {ReactiveFormsModule} from '@angular/forms';
import {RegisterFormComponent} from './components/forms/register-form/register-form.component';
import {RegisterPageComponent} from './views/register/register-page.component';
import {ResetPasswordFormComponent} from './components/forms/reset-password-form/reset-password-form.component';
import {ResetPasswordPageComponent} from './views/reset-password/reset-password-page.component';
import {SelectDropdownInputComponent} from './components/inputs/select-dropdown-input/select-dropdown-input.component';
import {SkillProxy} from './services/proxy/skill-proxy.service';
import {SliderComponent} from './components/slider/slider.component';
import {StatusInputComponent} from './components/inputs/status-input/status-input.component';
import {StreetInputComponent} from './components/inputs/street-input/street-input.component';
import {SuccessMessageComponent} from './components/messages/success-message/success-message.component';
import {SystemLanguageInputComponent} from './components/inputs/system-language-input/system-language-input.component';
import {SystemLanguagesService} from './services/system-languages.service';
import {TermsInputComponent} from './components/inputs/terms-input/terms-input.component';
import {TextareaInputComponent} from './components/inputs/textarea-input/textarea-input.component';
import {TextInputComponent} from './components/inputs/text-input/text-input.component';
import {TranslationService} from './services/translation.service';
import {TruncatePipe} from './utils/truncate';
import {UserDetailsComponent} from './views/user/user-settings/user-details/user-details.component';
import {UserDetailsFormComponent} from './components/forms/user-details-form/user-details-form.component';
import {UserJobsComponent} from './views/my-jobs/user-jobs/user-jobs.component';
import {UserManager} from './services/user-manager.service';
import {UserProfileComponent} from './views/user/user-settings/user-profile/user-profile.component';
import {UserProfileFormComponent} from './components/forms/user-profile-form/user-profile-form.component';
import {UserProxy} from './services/proxy/user-proxy.service';
import {UserSettingsComponent} from './views/user/user-settings/user-settings.component';
import {WelcomeHeaderComponent} from './components/headers/welcome-header/welcome-header.component';
import {ZipInputComponent} from './components/inputs/zip-input/zip-input.component';
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
    AppRoutingModule,
    AppTranslateModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    NgSemanticModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: environment.googleMapsKey
    })
  ],
  declarations: [
    AccountNumberInputComponent,
    AddressInputComponent,
    ApiErrorsComponent,
    AppComponent,
    AutosizeDirective,
    BankAccountInputComponent,
    BaseMessageComponent,
    BasicBorderHeaderComponent,
    CityInputComponent,
    ClearingNumberInputComponent,
    CommentsComponent,
    ConfirmationComponent,
    ContactFormComponent,
    ContactPageComponent,
    CookieBarComponent,
    CookiesAboutPageComponent,
    CountryOfOriginInputComponent,
    EmailInputComponent,
    EmailOrPhoneInputComponent,
    ErrorMessageComponent,
    ErrorPageComponent,
    FaqAccordionComponent,
    FaqPageComponent,
    FirstNameInputComponent,
    ForgotPasswordFormComponent,
    ForgotPasswordPageComponent,
    FormSubmitButtonComponent,
    GenderInputComponent,
    HomeComponent,
    InfoMessageComponent,
    InputErrorComponent,
    InputErrorsComponent,
    JobCardComponent,
    JobDetailsComponent,
    JobListItemComponent,
    JobMapMarkerComponent,
    JobsComponent,
    LastNameInputComponent,
    LoadingComponent,
    LoginFormComponent,
    LoginPageComponent,
    MessageInputComponent,
    MyJobsComponent,
    MyJobsItemComponent,
    NameInputComponent,
    NewPasswordInputComponent,
    NotFoundPageComponent,
    OldPasswordInputComponent,
    PagerComponent,
    PasswordInputComponent,
    PhoneInputComponent,
    RegisterFormComponent,
    RegisterPageComponent,
    ResetPasswordFormComponent,
    ResetPasswordPageComponent,
    SelectDropdownInputComponent,
    SliderComponent,
    StatusInputComponent,
    StreetInputComponent,
    SuccessMessageComponent,
    SystemLanguageInputComponent,
    TermsInputComponent,
    TextareaInputComponent,
    TextInputComponent,
    TruncatePipe,
    UserDetailsComponent,
    UserDetailsFormComponent,
    UserJobsComponent,
    UserProfileComponent,
    UserProfileFormComponent,
    UserSettingsComponent,
    WelcomeHeaderComponent,
    ZipInputComponent,
  ],
  providers: [
    ActsAsUser,
    ApiCall,
    AuthManager,
    CommentsProxy,
    ContactProxy,
    CountryProxy,
    DataStore,
    FaqProxy,
    Geolocation,
    JobProxy,
    LanguageProxy,
    NavigationService,
    SkillProxy,
    SystemLanguagesService,
    TranslationService,
    UserManager,
    UserProxy,
    { provide: ErrorHandler, useClass: RavenErrorHandler }
  ],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule {}
