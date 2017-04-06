import {AccountNumberInputComponent} from './components/inputs/account-number-input/account-number-input.component';
import {ActsAsUserService} from './services/acts-as-user.service';
import {AgmCoreModule} from 'angular2-google-maps/core';
import {AlreadyRegisteredModalComponent} from './components/modals/already-registered-modal/already-registered-modal.component';
import {ApiCallService} from './services/api-call.service';
import {ApiErrorsComponent} from './components/form-errors/api-errors/api-errors.component';
import {APP_BASE_HREF} from '@angular/common';
import {AppComponent} from './app.component';
import {ApplicationsComponent} from './views/my-jobs/applications/applications.component';
import {ApplicationsStatusSectionComponent} from './components/sections/applications-status-section/applications-status-section.component';
import {ApplicationStatusCardComponent} from './components/cards/application-status-card/application-status-card.component';
import {AppliedForJobModalComponent} from './components/modals/applied-for-job-modal/applied-for-job-modal.component';
import {ApplyForJobFormComponent} from './components/forms/apply-for-job-form/apply-for-job-form.component';
import {ApplyForJobModalComponent} from './components/modals/apply-for-job-modal/apply-for-job-modal.component';
import {ApplyMessageInputComponent} from './components/inputs/apply-message-input/apply-message-input.component';
import {AppNavbarComponent} from './components/navbars/app-navbar/app-navbar.component';
import {AppTranslateModule} from './app.translate.module';
import {AtUndInputComponent} from './components/inputs/at-und-input/at-und-input.component';
import {AutosizeDirective} from './directives/textarea-autosize/textarea-autosize.directive';
import {BaseButtonComponent} from './components/buttons/base-button/base-button.component';
import {BaseMessageComponent} from './components/messages/base-message.component';
import {BasicBorderHeaderComponent} from './components/headers/basic-border-header/basic-border-header.component';
import {BasicTabComponent} from './components/tabs/basic-tab/basic-tab.component';
import {BasicTabsComponent} from './components/tabs/basic-tabs/basic-tabs.component';
import {BrowserModule} from '@angular/platform-browser';
import {CircularImageInputComponent} from './components/inputs/circular-image-input/circular-image-input.component';
import {CityInputComponent} from './components/inputs/city-input/city-input.component';
import {ClearingNumberInputComponent} from './components/inputs/clearing-number-input/clearing-number-input.component';
import {CommentsComponent} from './components/comments/comments.component';
import {CompactJobCardComponent} from './components/cards/compact-job-card/compact-job-card.component';
import {CompetenceInputComponent} from './components/inputs/competence-input/competence-input.component';
import {ConfirmationModalComponent} from './components/modals/confirmation-modal/confirmation-modal.component';
import {ContactFormComponent} from './components/forms/contact-form/contact-form.component';
import {ContactMessageSentModalComponent} from './components/modals/contact-message-sent-modal/contact-message-sent-modal.component';
import {ContactPageComponent} from './components/pages/contact-page/contact-page.component';
import {CookieBarComponent} from './components/bars/cookie-bar/cookie-bar.component';
import {CookiesAboutPageComponent} from './components/pages/cookies-about-page/cookies-about-page.component';
import {CountryOfOriginInputComponent} from './components/inputs/country-of-origin-input/country-of-origin-input.component';
import {CustomRadioButtonInputComponent} from './components/inputs/custom-radio-button-input/custom-radio-button-input.component';
import {DataStoreService} from './services/data-store.service';
import {DefaultFooterComponent} from './components/footers/default-footer/default-footer.component';
import {DefaultLayoutComponent} from './components/layouts/default-layout/default-layout.component';
import {DefaultNavigationComponent} from './components/navigations/default-navigation/default-navigation.component';
import {DescriptionInputComponent} from './components/inputs/description-input/description-input.component';
import {EducationInputComponent} from './components/inputs/education-input/education-input.component';
import {EmailInputComponent} from './components/inputs/email-input/email-input.component';
import {EmailOrPhoneInputComponent} from './components/inputs/email-or-phone-input/email-or-phone-input.component';
import {environment} from '../environments/environment';
import {ErrorHandler } from '@angular/core';
import {ErrorMessageComponent} from './components/messages/error-message/error-message.component';
import {ErrorPageComponent} from './components/pages/error-page/error-page.component';
import {FaqAccordionComponent} from './components/accordions/faq-accordion/faq-accordion.component';
import {FaqPageComponent} from './components/pages/faq-page/faq-page.component';
import {FileInputButtonComponent} from './components/buttons/file-input-button/file-input-button.component';
import {FirstNameInputComponent} from './components/inputs/first-name-input/first-name-input.component';
import {ForbiddenPageComponent} from './components/pages/forbidden-page/forbidden-page.component';
import {ForgotPasswordFormComponent} from './components/forms/forgot-password-form/forgot-password-form.component';
import {ForgotPasswordModalComponent} from './components/modals/forgot-password-modal/forgot-password-modal.component';
import {ForgotPasswordPageComponent} from './components/pages/forgot-password-page/forgot-password-page.component';
import {FormsModule} from '@angular/forms';
import {FormSubmitButtonComponent} from './components/buttons/form-submit-button/form-submit-button.component';
import {FrilansTermsInputComponent} from './components/inputs/frilans-terms-input/frilans-terms-input.component';
import {GenderInputComponent} from './components/inputs/gender-input/gender-input.component';
import {GeolocationService} from './services/geolocation.service';
import {ModalService} from './services/modal.service';
import {GotCoordinationNumberInputComponent} from './components/inputs/got-coordination-number-input/got-coordination-number-input.component';
import {HomePageComponent} from './components/pages/home-page/home-page.component';
import {HowItWorksAndMaximizeChancesSectionComponent} from './components/sections/how-it-works-and-maximize-chances-section/how-it-works-and-maximize-chances-section.component';
import {HowItWorksSectionComponent} from './components/sections/how-it-works-section/how-it-works-section.component';
import {HttpModule} from '@angular/http';
import {InfoMessageComponent} from './components/messages/info-message/info-message.component';
import {InputErrorComponent} from './components/form-errors/input-error/input-error.component';
import {InputErrorsComponent} from './components/form-errors/input-errors/input-errors.component';
import {InputHintLabelComponent} from './components/labels/input-hint-label/input-hint-label.component';
import {JARoutes} from './routes/ja-routes/ja-routes';
import {JobAdditionalUserInfoModalComponent} from './components/modals/job-additional-user-info-modal/job-additional-user-info-modal.component';
import {JobCardComponent} from './components/cards/job-card/job-card.component';
import {JobDetailsComponent} from './views/job-details/job-details.component';
import {JobExperienceInputComponent} from './components/inputs/job-experience-input/job-experience-input.component';
import {JobListItemComponent} from './components/job-list-item/job-list-item.component';
import {JobMapMarkerComponent} from './components/map-markers/job-map-marker/job-map-marker.component';
import {JobsComponent} from './views/jobs/jobs.component';
import {JobsMapComponent} from './components/maps/jobs-map/jobs-map.component';
import {LanguageMenuComponent} from './components/menus/language-menu/language-menu.component';
import {LanguageProficiencyInputComponent} from './components/inputs/language-proficiency-input/language-proficiency-input.component';
import {LanguagesInputComponent} from './components/inputs/languages-input/languages-input.component';
import {LastNameInputComponent} from './components/inputs/last-name-input/last-name-input.component';
import {LMACardInputComponent} from './components/inputs/lma-card-input/lma-card-input.component';
import {LoginFormComponent} from './components/forms/login-form/login-form.component';
import {LoginModalComponent} from './components/modals/login-modal/login-modal.component';
import {LoginPageComponent} from './components/pages/login-page/login-page.component';
import {LostConnectionPageComponent} from './components/pages/lost-connection-page/lost-connection-page.component';
import {MaximizeChancessSectionComponent} from './components/sections/maximize-chances-section/maximize-chances-section.component';
import {MessageInputComponent} from './components/inputs/message-input/message-input.component';
import {MyJobsComponent} from './views/my-jobs/my-jobs.component';
import {MyJobsItemComponent} from './components/my-jobs-item/my-jobs-item.component';
import {NameInputComponent} from './components/inputs/name-input/name-input.component';
import {NavigationMenuComponent} from './components/menus/navigation-menu/navigation-menu.component';
import {NavigationService} from './services/navigation.service';
import {NewJobsSectionComponent} from './components/sections/new-jobs-section/new-jobs-section.component';
import {NewPasswordInputComponent} from './components/inputs/new-password-input/new-password-input.component';
import {NgModule} from '@angular/core';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {NotFoundPageComponent} from './components/pages/404-page/404-page.component';
import {OldPasswordInputComponent} from './components/inputs/old-password-input/old-password-input.component';
import {PagerComponent} from './components/pager/pager.component';
import {PartnersSectionComponent} from './components/sections/partners-section/partners-section.component';
import {PasswordChangedModalComponent} from './components/modals/password-changed-modal/password-changed-modal.component';
import {PasswordInputComponent} from './components/inputs/password-input/password-input.component';
import {PasswordResetLinkSentModalComponent} from './components/modals/password-reset-link-sent-modal/password-reset-link-sent-modal.component';
import {PersonalIDInputComponent} from './components/inputs/personal-id-input/personal-id-input.component';
import {PhoneInputComponent} from './components/inputs/phone-input/phone-input.component';
import {ProfileImageInputComponent} from './components/inputs/profile-image-input/profile-image-input.component';
import {ProxiesModule} from './proxies/proxies.module';
import {RatingInputComponent} from './components/inputs/rating-input/rating-input.component';
import {ReactiveFormsModule} from '@angular/forms';
import {RegisteredModalComponent} from './components/modals/registered-modal/registered-modal.component';
import {RegisterFormComponent} from './components/forms/register-form/register-form.component';
import {RegisterModalComponent} from './components/modals/register-modal/register-modal.component';
import {RegisterPageComponent} from './components/pages/register-page/register-page.component';
import {ResetPasswordFormComponent} from './components/forms/reset-password-form/reset-password-form.component';
import {ResetPasswordPageComponent} from './components/pages/reset-password-page/reset-password-page.component';
import {ResidencePermitBackInputComponent} from './components/inputs/residence-permit-back-input/residence-permit-back-input.component';
import {ResidencePermitFrontInputComponent} from './components/inputs/residence-permit-front-input/residence-permit-front-input.component';
import {ResolversModule} from './resolvers/resolvers.module';
import {ResumeInputComponent} from './components/inputs/resume-input/resume-input.component';
import {RoutesModule} from './routes/routes.module';
import {SelectDropdownInputComponent} from './components/inputs/select-dropdown-input/select-dropdown-input.component';
import {SemanticModule} from './semantic/semantic.module';
import {SignedForJobModalComponent} from './components/modals/signed-for-job-modal/signed-for-job-modal.component';
import {SignForJobFormComponent} from './components/forms/sign-for-job-form/sign-for-job-form.component';
import {SignForJobModalComponent} from './components/modals/sign-for-job-modal/sign-for-job-modal.component';
import {SkatteverketCertificateInputComponent} from './components/inputs/skatteverket-certificate-input/skatteverket-certificate-input.component';
import {SkillProficiencyInputComponent} from './components/inputs/skill-proficiency-input/skill-proficiency-input.component';
import {SkillsInputComponent} from './components/inputs/skills-input/skills-input.component';
import {SSNInputComponent} from './components/inputs/ssn-input/ssn-input.component';
import {StatusInputComponent} from './components/inputs/status-input/status-input.component';
import {StreetInputComponent} from './components/inputs/street-input/street-input.component';
import {SuccessMessageComponent} from './components/messages/success-message/success-message.component';
import {SystemLanguageInputComponent} from './components/inputs/system-language-input/system-language-input.component';
import {SystemLanguagesResolver} from './resolvers/system-languages/system-languages.resolver';
import {TermsInputComponent} from './components/inputs/terms-input/terms-input.component';
import {TextareaInputComponent} from './components/inputs/textarea-input/textarea-input.component';
import {TextInputComponent} from './components/inputs/text-input/text-input.component';
import {UploadDocumentCardComponent} from './components/cards/upload-document-card/upload-document-card.component';
import {UploadImageCardComponent} from './components/cards/upload-image-card/upload-image-card.component';
import {UserDetailsFormComponent} from './components/forms/user-details-form/user-details-form.component';
import {UserDocumentCardInputComponent} from './components/inputs/user-document-card-input/user-document-card-input.component';
import {UserImageCardInputComponent} from './components/inputs/user-image-card-input/user-image-card-input.component';
import {UserImageCircularInputComponent} from './components/inputs/user-image-circular-input/user-image-circular-input.component';
import {UserProfileFormComponent} from './components/forms/user-profile-form/user-profile-form.component';
import {UserProfileHeaderComponent} from './components/headers/user-profile-header/user-profile-header.component';
import {UserProfilePageComponent} from './components/pages/user-profile-page/user-profile-page.component';
import {UserResolver} from './resolvers/user/user.resolver';
import {UserUpdateFormComponent} from './components/forms/user-update-form/user-update-form.component';
import {WelcomeHeaderComponent} from './components/headers/welcome-header/welcome-header.component';
import {WorkPermitBackInputComponent} from './components/inputs/work-permit-back-input/work-permit-back-input.component';
import {WorkPermitFrontInputComponent} from './components/inputs/work-permit-front-input/work-permit-front-input.component';
import {YesNoInputComponent} from './components/inputs/yes-no-input/yes-no-input.component';
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
    AgmCoreModule.forRoot({
      apiKey: environment.googleMapsKey
    }),
    AppTranslateModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    ProxiesModule,
    ReactiveFormsModule,
    RoutesModule,
    SemanticModule,
  ],
  declarations: [
    AccountNumberInputComponent,
    AlreadyRegisteredModalComponent,
    ApiErrorsComponent,
    AppComponent,
    ApplicationsComponent,
    ApplicationsStatusSectionComponent,
    ApplicationStatusCardComponent,
    AppliedForJobModalComponent,
    ApplyForJobFormComponent,
    ApplyForJobModalComponent,
    ApplyMessageInputComponent,
    AppNavbarComponent,
    AtUndInputComponent,
    AutosizeDirective,
    BaseButtonComponent,
    BaseMessageComponent,
    BasicBorderHeaderComponent,
    BasicTabComponent,
    BasicTabsComponent,
    CircularImageInputComponent,
    CityInputComponent,
    ClearingNumberInputComponent,
    CommentsComponent,
    CompactJobCardComponent,
    CompetenceInputComponent,
    ConfirmationModalComponent,
    ContactFormComponent,
    ContactMessageSentModalComponent,
    ContactPageComponent,
    CookieBarComponent,
    CookiesAboutPageComponent,
    CountryOfOriginInputComponent,
    CustomRadioButtonInputComponent,
    DefaultFooterComponent,
    DefaultLayoutComponent,
    DefaultNavigationComponent,
    DescriptionInputComponent,
    EducationInputComponent,
    EmailInputComponent,
    EmailOrPhoneInputComponent,
    ErrorMessageComponent,
    ErrorPageComponent,
    FaqAccordionComponent,
    FaqPageComponent,
    FileInputButtonComponent,
    FirstNameInputComponent,
    ForbiddenPageComponent,
    ForgotPasswordFormComponent,
    ForgotPasswordModalComponent,
    ForgotPasswordPageComponent,
    FormSubmitButtonComponent,
    FrilansTermsInputComponent,
    GenderInputComponent,
    GotCoordinationNumberInputComponent,
    HomePageComponent,
    HowItWorksAndMaximizeChancesSectionComponent,
    HowItWorksSectionComponent,
    InfoMessageComponent,
    InputErrorComponent,
    InputErrorsComponent,
    InputHintLabelComponent,
    JobAdditionalUserInfoModalComponent,
    JobCardComponent,
    JobDetailsComponent,
    JobExperienceInputComponent,
    JobListItemComponent,
    JobMapMarkerComponent,
    JobsComponent,
    JobsMapComponent,
    LanguageMenuComponent,
    LanguageProficiencyInputComponent,
    LanguagesInputComponent,
    LastNameInputComponent,
    LMACardInputComponent,
    LoginFormComponent,
    LoginModalComponent,
    LoginPageComponent,
    LostConnectionPageComponent,
    MaximizeChancessSectionComponent,
    MessageInputComponent,
    MyJobsComponent,
    MyJobsItemComponent,
    NameInputComponent,
    NavigationMenuComponent,
    NewJobsSectionComponent,
    NewPasswordInputComponent,
    NotFoundPageComponent,
    OldPasswordInputComponent,
    PagerComponent,
    PartnersSectionComponent,
    PasswordChangedModalComponent,
    PasswordInputComponent,
    PasswordResetLinkSentModalComponent,
    PersonalIDInputComponent,
    PhoneInputComponent,
    ProfileImageInputComponent,
    RatingInputComponent,
    RegisteredModalComponent,
    RegisterFormComponent,
    RegisterModalComponent,
    RegisterPageComponent,
    ResetPasswordFormComponent,
    ResetPasswordPageComponent,
    ResidencePermitBackInputComponent,
    ResidencePermitFrontInputComponent,
    ResumeInputComponent,
    SelectDropdownInputComponent,
    SignedForJobModalComponent,
    SignForJobFormComponent,
    SignForJobModalComponent,
    SkatteverketCertificateInputComponent,
    SkillProficiencyInputComponent,
    SkillsInputComponent,
    SSNInputComponent,
    StatusInputComponent,
    StreetInputComponent,
    SuccessMessageComponent,
    SystemLanguageInputComponent,
    TermsInputComponent,
    TextareaInputComponent,
    TextInputComponent,
    UploadDocumentCardComponent,
    UploadImageCardComponent,
    UserDetailsFormComponent,
    UserDocumentCardInputComponent,
    UserImageCardInputComponent,
    UserImageCircularInputComponent,
    UserProfileFormComponent,
    UserProfileHeaderComponent,
    UserProfilePageComponent,
    UserUpdateFormComponent,
    WelcomeHeaderComponent,
    WorkPermitBackInputComponent,
    WorkPermitFrontInputComponent,
    YesNoInputComponent,
    ZipInputComponent,
  ],
  providers: [
    ActsAsUserService,
    ApiCallService,
    DataStoreService,
    GeolocationService,
    ModalService,
    NavigationService,
    { provide: ErrorHandler, useClass: RavenErrorHandler },
    { provide: APP_BASE_HREF, useValue: '/' }
  ],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule { }
