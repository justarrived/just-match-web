import {AgmCoreModule} from '@agm/core';
import {AlreadyRegisteredModalComponent} from './components/modals/already-registered-modal/already-registered-modal.component';
import {ApiCallService} from './services/api-call.service';
import {ApiErrorsComponent} from './components/form-errors/api-errors/api-errors.component';
import {APP_BASE_HREF} from '@angular/common';
import {AppComponent} from './app.component';
import {ApplicationItemComponent} from './components/items/application-item/application-item.component';
import {ApplicationsBannerSectionComponent} from './components/sections/applications-banner-section/applications-banner-section.component';
import {ApplicationsPageComponent} from './components/pages/applications-page/applications-page.component';
import {ApplicationsPagerSectionComponent} from './components/sections/applications-pager-section/applications-pager-section.component';
import {ApplicationsStatusSectionComponent} from './components/sections/applications-status-section/applications-status-section.component';
import {ApplicationStatusCardComponent} from './components/cards/application-status-card/application-status-card.component';
import {AppliedForJobModalComponent} from './components/modals/applied-for-job-modal/applied-for-job-modal.component';
import {ApplyForJobFormComponent} from './components/forms/apply-for-job-form/apply-for-job-form.component';
import {ApplyForJobModalComponent} from './components/modals/apply-for-job-modal/apply-for-job-modal.component';
import {ApplyMessageInputComponent} from './components/inputs/apply-message-input/apply-message-input.component';
import {AppNavbarComponent} from './components/navbars/app-navbar/app-navbar.component';
import {AppTranslateModule} from './app.translate.module';
import {AtUndInputComponent} from './components/inputs/at-und-input/at-und-input.component';
import {AutosizeDirective} from './directives/autosize/autosize.directive';
import {BackToJobsSectionComponent} from './components/sections/back-to-jobs-section/back-to-jobs-section.component';
import {BankAccountInputComponent} from './components/inputs/bank-account-input/bank-account-input.component';
import {BaseButtonComponent} from './components/buttons/base-button/base-button.component';
import {BaseMessageComponent} from './components/messages/base-message/base-message.component';
import {BasicModalComponent} from './components/modals/basic-modal/basic-modal.component';
import {BasicAccordionComponent} from './components/accordions/basic-accordion/basic-accordion.component';
import {BasicAccordionItemComponent} from './components/items/basic-accordion-item/basic-accordion-item.component';
import {BasicBorderSectionComponent} from './components/sections/basic-border-section/basic-border-section.component';
import {BasicChatComponent} from './components/chats/basic-chat/basic-chat.component';
import {BasicChatMessageComponent} from './components/chat-message/basic-chat-message/basic-chat-message.component';
import {BasicChatMessagesComponent} from './components/chat-messages/basic-chat-messages/basic-chat-messages.component';
import {BasicCommentComponent} from './components/comment/basic-comment/basic-comment.component';
import {BasicCommentsComponent} from './components/comments/basic-comments/basic-comments.component';
import {BasicLinkComponent} from './components/links/basic-link/basic-link.component';
import {BasicLoaderComponent} from './components/loaders/basic-loader/basic-loader.component';
import {BasicPagerComponent} from './components/pagers/basic-pager/basic-pager.component';
import {BasicSearchComponent} from './components/search/basic-search/basic-search.component';
import {BasicTabComponent} from './components/tabs/basic-tab/basic-tab.component';
import {BasicTabsComponent} from './components/tabs/basic-tabs/basic-tabs.component';
import {BasicTextComponent} from './components/text/basic-text/basic-text.component';
import {BasicTitleTextComponent} from './components/text/basic-title-text/basic-title-text.component';
import {BrowserModule} from '@angular/platform-browser';
import {ChatMessageInputComponent} from './components/inputs/chat-message-input/chat-message-input.component';
import {CheckboxInputComponent} from './components/inputs/checkbox-input/checkbox-input.component';
import {CircularIconBaseButtonComponent} from './components/buttons/circular-icon-base-button/circular-icon-base-button.component';
import {CircularImageInputComponent} from './components/inputs/circular-image-input/circular-image-input.component';
import {CityInputComponent} from './components/inputs/city-input/city-input.component';
import {CommentInputComponent} from './components/inputs/comment-input/comment-input.component';
import {CommentsFormComponent} from './components/forms/comments-form/comments-form.component';
import {CommonModule } from '@angular/common';
import {CompactJobCardComponent} from './components/cards/compact-job-card/compact-job-card.component';
import {CompetenceInputComponent} from './components/inputs/competence-input/competence-input.component';
import {ConfirmationModalComponent} from './components/modals/confirmation-modal/confirmation-modal.component';
import {ContactFormComponent} from './components/forms/contact-form/contact-form.component';
import {ContactMessageInputComponent} from './components/inputs/contact-message-input/contact-message-input.component';
import {ContactMessageSentModalComponent} from './components/modals/contact-message-sent-modal/contact-message-sent-modal.component';
import {ContactPageComponent} from './components/pages/contact-page/contact-page.component';
import {SubscribePageComponent} from './components/pages/subscribe-page/subscribe-page.component';
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
import {FacebookUrlInputComponent} from './components/inputs/facebook-url-input/facebook-url-input.component';
import {FaqAccordionComponent} from './components/accordions/faq-accordion/faq-accordion.component';
import {FaqPageComponent} from './components/pages/faq-page/faq-page.component';
import {FileInputButtonComponent} from './components/buttons/file-input-button/file-input-button.component';
import {FilterJobsInputComponent} from './components/inputs/filter-jobs-input/filter-jobs-input.component';
import {FilterUsersInputComponent} from './components/inputs/filter-users-input/filter-users-input.component';
import {FirstNameInputComponent} from './components/inputs/first-name-input/first-name-input.component';
import {ForbiddenPageComponent} from './components/pages/forbidden-page/forbidden-page.component';
import {ForgotPasswordFormComponent} from './components/forms/forgot-password-form/forgot-password-form.component';
import {SubscribeFormComponent} from './components/forms/subscribe-form/subscribe-form.component';
import {ForgotPasswordModalComponent} from './components/modals/forgot-password-modal/forgot-password-modal.component';
import {ForgotPasswordPageComponent} from './components/pages/forgot-password-page/forgot-password-page.component';
import {FormSectionTitleTextComponent} from './components/text/form-section-title-text/form-section-title-text.component';
import {FormsModule} from '@angular/forms';
import {FormSubmitButtonComponent} from './components/buttons/form-submit-button/form-submit-button.component';
import {FrilansTermsInputComponent} from './components/inputs/frilans-terms-input/frilans-terms-input.component';
import {GenderInputComponent} from './components/inputs/gender-input/gender-input.component';
import {GeolocationService} from './services/geolocation.service';
import {GodModeBarComponent} from './components/bars/god-mode-bar/god-mode-bar.component';
import {GodModePageComponent} from './components/pages/god-mode-page/god-mode-page.component';
import {GodModePagerSectionComponent} from './components/sections/god-mode-pager-section/god-mode-pager-section.component';
import {GotCoordinationNumberInputComponent} from './components/inputs/got-coordination-number-input/got-coordination-number-input.component';
import {HomePageComponent} from './components/pages/home-page/home-page.component';
import {HowItWorksSectionComponent} from './components/sections/how-it-works-section/how-it-works-section.component';
import {HttpModule} from '@angular/http';
import {InfoMessageComponent} from './components/messages/info-message/info-message.component';
import {InputErrorComponent} from './components/form-errors/input-error/input-error.component';
import {InputErrorsComponent} from './components/form-errors/input-errors/input-errors.component';
import {InputHintLabelComponent} from './components/labels/input-hint-label/input-hint-label.component';
import {InterestLevelInputComponent} from './components/inputs/interest-level-input/interest-level-input.component';
import {InterestsInputComponent} from './components/inputs/interests-input/interests-input.component';
import {JARoutes} from './routes/ja-routes/ja-routes';
import {JobActionsSectionComponent} from './components/sections/job-actions-section/job-actions-section.component';
import {JobAdditionalUserInfoModalComponent} from './components/modals/job-additional-user-info-modal/job-additional-user-info-modal.component';
import {JobApplicantSectionComponent} from './components/sections/job-applicant-section/job-applicant-section.component';
import {JobBannerSectionComponent} from './components/sections/job-banner-section/job-banner-section.component';
import {JobCardComponent} from './components/cards/job-card/job-card.component';
import {JobCommentsSectionComponent} from './components/sections/job-comments-section/job-comments-section.component';
import {JobCompanyDescriptionSectionComponent} from './components/sections/job-company-description-section/job-company-description-section.component';
import {JobCompanyImageSectionComponent} from './components/sections/job-company-image-section/job-company-image-section.component';
import {JobDescriptionSection2Component} from './components/sections/job-description-section/job-description-section.component';
import {JobExperienceInputComponent} from './components/inputs/job-experience-input/job-experience-input.component';
import {JobImportantInformationSectionComponent} from './components/sections/job-important-information-section/job-important-information-section.component';
import {JobMapMarkerComponent} from './components/map-markers/job-map-marker/job-map-marker.component';
import {JobPageComponent} from './components/pages/job-page/job-page.component';
import {JobRecruiterSectionComponent} from './components/sections/job-recruiter-section/job-recruiter-section.component';
import {JobRequirementsSectionComponent} from './components/sections/job-requirements-section/job-requirements-section.component';
import {JobsFilterComponent} from './components/filters/jobs-filter/jobs-filter.component';
import {JobShortDescriptionSectionComponent} from './components/sections/job-short-description-section/job-short-description-section.component';
import {JobsMapComponent} from './components/maps/jobs-map/jobs-map.component';
import {JobsPageComponent} from './components/pages/jobs-page/jobs-page.component';
import {JobsPagerSectionComponent} from './components/sections/jobs-pager-section/jobs-pager-section.component';
import {JobTasksSectionComponent} from './components/sections/job-tasks-section/job-tasks-section.component';
import {JobTitleSectionComponent} from './components/sections/job-title-section/job-title-section.component';
import {LanguageMenuComponent} from './components/menus/language-menu/language-menu.component';
import {LanguageProficiencyInputComponent} from './components/inputs/language-proficiency-input/language-proficiency-input.component';
import {LanguagesInputComponent} from './components/inputs/languages-input/languages-input.component';
import {LastNameInputComponent} from './components/inputs/last-name-input/last-name-input.component';
import {LinkedinUrlInputComponent} from './components/inputs/linkedin-url-input/linkedin-url-input.component';
import {LMACardInputComponent} from './components/inputs/lma-card-input/lma-card-input.component';
import {LOCALE_ID} from '@angular/core';
import {LoginFormComponent} from './components/forms/login-form/login-form.component';
import {LoginModalComponent} from './components/modals/login-modal/login-modal.component';
import {LoginOrRegisterModalComponent} from './components/modals/login-or-register-modal/login-or-register-modal.component';
import {LoginPageComponent} from './components/pages/login-page/login-page.component';
import {LostConnectionPageComponent} from './components/pages/lost-connection-page/lost-connection-page.component';
import {MissingPaymentInformationModalComponent} from './components/modals/missing-payment-information-modal/missing-payment-information-modal.component';
import {ModalService} from './services/modal.service';
import {ModalTagsDirective} from './directives/modal-tags/modal-tags.directive';
import {NameInputComponent} from './components/inputs/name-input/name-input.component';
import {NavigationMenuComponent} from './components/menus/navigation-menu/navigation-menu.component';
import {NavigationService} from './services/navigation.service';
import {NewJobsSectionComponent} from './components/sections/new-jobs-section/new-jobs-section.component';
import {NewPasswordInputComponent} from './components/inputs/new-password-input/new-password-input.component';
import {NgModule} from '@angular/core';
import {NotFoundPageComponent} from './components/pages/404-page/404-page.component';
import {NumberedPagerComponent} from './components/pagers/numbered-pager/numbered-pager.component';
import {PrimaryOccupationsInputComponent} from './components/inputs/primary-occupations-input/primary-occupations-input.component';
import {JobDigestNotificationFrequencyInputComponent} from './components/inputs/job-digest-notification-frequency-input/job-digest-notification-frequency-input.component';
import {OldPasswordInputComponent} from './components/inputs/old-password-input/old-password-input.component';
import {PageOptionsService} from './services/page-options.service';
import {PartnersSectionComponent} from './components/sections/partners-section/partners-section.component';
import {PasswordChangedModalComponent} from './components/modals/password-changed-modal/password-changed-modal.component';
import {PasswordInputComponent} from './components/inputs/password-input/password-input.component';
import {PasswordResetLinkSentModalComponent} from './components/modals/password-reset-link-sent-modal/password-reset-link-sent-modal.component';
import {PersonalIDInputComponent} from './components/inputs/personal-id-input/personal-id-input.component';
import {PhoneInputComponent} from './components/inputs/phone-input/phone-input.component';
import {AddressAutocompleteInputComponent} from './components/inputs/address-autocomplete-input/address-autocomplete-input.component';
import {CityAutocompleteInputComponent} from './components/inputs/city-autocomplete-input/city-autocomplete-input.component';
import {ProfileImageInputComponent} from './components/inputs/profile-image-input/profile-image-input.component';
import {ProxiesModule} from './proxies/proxies.module';
import {RatingInputComponent} from './components/inputs/rating-input/rating-input.component';
import {ReactiveFormsModule} from '@angular/forms';
import {RegisteredModalComponent} from './components/modals/registered-modal/registered-modal.component';
import {SubscribedModalComponent} from './components/modals/subscribed-modal/subscribed-modal.component';
import {RegisterFormComponent} from './components/forms/register-form/register-form.component';
import {RegisterModalComponent} from './components/modals/register-modal/register-modal.component';
import {RegisterPageComponent} from './components/pages/register-page/register-page.component';
import {RequirementsSectionComponent} from './components/sections/requirements-section/requirements-section.component';
import {ResetPasswordFormComponent} from './components/forms/reset-password-form/reset-password-form.component';
import {ResetPasswordPageComponent} from './components/pages/reset-password-page/reset-password-page.component';
import {ResidencePermitBackInputComponent} from './components/inputs/residence-permit-back-input/residence-permit-back-input.component';
import {ResidencePermitFrontInputComponent} from './components/inputs/residence-permit-front-input/residence-permit-front-input.component';
import {ResolversModule} from './resolvers/resolvers.module';
import {ResumeInputComponent} from './components/inputs/resume-input/resume-input.component';
import {RoutesModule} from './routes/routes.module';
import {SearchInputComponent} from './components/inputs/search-input/search-input.component';
import {SelectDropdownInputComponent} from './components/inputs/select-dropdown-input/select-dropdown-input.component';
import {SelectInputComponent} from './components/inputs/select-input/select-input.component';
import {ShareModalComponent} from './components/modals/share-modal/share-modal.component';
import {ShareSectionComponent} from './components/sections/share-section/share-section.component';
import {ShareWithModalSectionComponent} from './components/sections/share-with-modal-section/share-with-modal-section.component';
import {SignedForJobModalComponent} from './components/modals/signed-for-job-modal/signed-for-job-modal.component';
import {SignForJobFormComponent} from './components/forms/sign-for-job-form/sign-for-job-form.component';
import {SignForJobModalComponent} from './components/modals/sign-for-job-modal/sign-for-job-modal.component';
import {SimpleMessageComponent} from './components/messages/simple-message/simple-message.component';
import {SkatteverketCertificateInputComponent} from './components/inputs/skatteverket-certificate-input/skatteverket-certificate-input.component';
import {SkillProficiencyInputComponent} from './components/inputs/skill-proficiency-input/skill-proficiency-input.component';
import {SkillsInputComponent} from './components/inputs/skills-input/skills-input.component';
import {SocialMediaSectionComponent} from './components/sections/social-media-section/social-media-section.component';
import {SortUsersInputComponent} from './components/inputs/sort-users-input/sort-users-input.component';
import {SSNInputComponent} from './components/inputs/ssn-input/ssn-input.component';
import {StatusInputComponent} from './components/inputs/status-input/status-input.component';
import {StepModalComponent} from './components/modals/step-modal/step-modal.component';
import {StepperModalComponent} from './components/modals/stepper-modal/stepper-modal.component';
import {StreetInputComponent} from './components/inputs/street-input/street-input.component';
import {SuccessMessageComponent} from './components/messages/success-message/success-message.component';
import {SupportChatComponent} from './components/chats/support-chat/support-chat.component';
import {SupportChatPageComponent} from './components/pages/support-chat-page/support-chat-page.component';
import {SystemLanguageInputComponent} from './components/inputs/system-language-input/system-language-input.component';
import {SystemLanguagesResolver} from './resolvers/system-languages/system-languages.resolver';
import {TermsInputComponent} from './components/inputs/terms-input/terms-input.component';
import {TextareaInputComponent} from './components/inputs/textarea-input/textarea-input.component';
import {TextInputComponent} from './components/inputs/text-input/text-input.component';
import {UploadDocumentCardComponent} from './components/cards/upload-document-card/upload-document-card.component';
import {UploadImageCardComponent} from './components/cards/upload-image-card/upload-image-card.component';
import {UserCardComponent} from './components/cards/user-card/user-card.component';
import {UserDetailsFormComponent} from './components/forms/user-details-form/user-details-form.component';
import {UserDocumentCardInputComponent} from './components/inputs/user-document-card-input/user-document-card-input.component';
import {UserImageCardInputComponent} from './components/inputs/user-image-card-input/user-image-card-input.component';
import {UserImageCircularInputComponent} from './components/inputs/user-image-circular-input/user-image-circular-input.component';
import {UserMissingTraitsMessageComponent} from './components/messages/user-missing-traits-message/user-missing-traits-message.component';
import {UserMissingTraitsNextFormComponent} from './components/forms/user-missing-traits-next-form/user-missing-traits-next-form.component';
import {UserProfileBannerSectionComponent} from './components/sections/user-profile-banner-section/user-profile-banner-section.component';
import {UserProfileFormComponent} from './components/forms/user-profile-form/user-profile-form.component';
import {UserProfilePageComponent} from './components/pages/user-profile-page/user-profile-page.component';
import {UserResolver} from './resolvers/user/user.resolver';
import {UsersFilterComponent} from './components/filters/users-filter/users-filter.component';
import {UserUpdateFormComponent} from './components/forms/user-update-form/user-update-form.component';
import {WelcomeBannerSectionComponent} from './components/sections/welcome-banner-section/welcome-banner-section.component';
import {BasicStepperComponent} from './components/steppers/basic-stepper/basic-stepper.component';
import {UpdateProfileStep1ModalComponent} from './components/modals/update-profile-step-1-modal/update-profile-step-1-modal.component';
import {UpdateProfileStep2ModalComponent} from './components/modals/update-profile-step-2-modal/update-profile-step-2-modal.component';
import {UpdateProfileStep3ModalComponent} from './components/modals/update-profile-step-3-modal/update-profile-step-3-modal.component';
import {UpdateProfileStep4ModalComponent} from './components/modals/update-profile-step-4-modal/update-profile-step-4-modal.component';
import {WelcomeStep1ModalComponent} from './components/modals/welcome-step-1-modal/welcome-step-1-modal.component';
import {WelcomeStep2ModalComponent} from './components/modals/welcome-step-2-modal/welcome-step-2-modal.component';
import {WelcomeStep3ModalComponent} from './components/modals/welcome-step-3-modal/welcome-step-3-modal.component';
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
    if (error !== 'handled') {
      if (error.promise) {
        error.promise.catch(promiseError => {
          if (promiseError !== 'handled') {
            console.error(error);
            Raven.captureException(error);
          }
        });
      } else {
        console.error(error);
        Raven.captureException(error);
      }
    }
  }
}

@NgModule({
  imports: [
    AgmCoreModule.forRoot({
      apiKey: environment.googleMapsKey,
      libraries: ["places"]
    }),
    AppTranslateModule,
    CommonModule,
    FormsModule,
    HttpModule,
    ProxiesModule,
    ReactiveFormsModule,
    RoutesModule,
  ],
  declarations: [
    AlreadyRegisteredModalComponent,
    AddressAutocompleteInputComponent,
    ApiErrorsComponent,
    AppComponent,
    ApplicationItemComponent,
    ApplicationsBannerSectionComponent,
    ApplicationsPageComponent,
    ApplicationsPagerSectionComponent,
    JobDigestNotificationFrequencyInputComponent,
    ApplicationsStatusSectionComponent,
    ApplicationStatusCardComponent,
    AppliedForJobModalComponent,
    ApplyForJobFormComponent,
    ApplyForJobModalComponent,
    ApplyMessageInputComponent,
    AppNavbarComponent,
    AtUndInputComponent,
    AutosizeDirective,
    BackToJobsSectionComponent,
    BankAccountInputComponent,
    BaseButtonComponent,
    BaseMessageComponent,
    BasicModalComponent,
    BasicAccordionComponent,
    BasicAccordionItemComponent,
    BasicBorderSectionComponent,
    BasicChatComponent,
    BasicChatMessageComponent,
    BasicChatMessagesComponent,
    BasicCommentComponent,
    BasicCommentsComponent,
    BasicLinkComponent,
    BasicLoaderComponent,
    BasicPagerComponent,
    BasicSearchComponent,
    BasicTabComponent,
    BasicStepperComponent,
    BasicTabsComponent,
    SubscribedModalComponent,
    BasicTextComponent,
    BasicTitleTextComponent,
    ChatMessageInputComponent,
    CheckboxInputComponent,
    CircularIconBaseButtonComponent,
    CircularImageInputComponent,
    CityInputComponent,
    SubscribePageComponent,
    CommentInputComponent,
    CommentsFormComponent,
    CompactJobCardComponent,
    CompetenceInputComponent,
    ConfirmationModalComponent,
    ContactFormComponent,
    ContactMessageInputComponent,
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
    CityAutocompleteInputComponent,
    PrimaryOccupationsInputComponent,
    ErrorMessageComponent,
    ErrorPageComponent,
    FacebookUrlInputComponent,
    FaqAccordionComponent,
    FaqPageComponent,
    FileInputButtonComponent,
    FilterJobsInputComponent,
    FilterUsersInputComponent,
    FirstNameInputComponent,
    ForbiddenPageComponent,
    ForgotPasswordFormComponent,
    ForgotPasswordModalComponent,
    ForgotPasswordPageComponent,
    FormSectionTitleTextComponent,
    FormSubmitButtonComponent,
    FrilansTermsInputComponent,
    GenderInputComponent,
    GodModeBarComponent,
    GodModePageComponent,
    GodModePagerSectionComponent,
    GotCoordinationNumberInputComponent,
    HomePageComponent,
    HowItWorksSectionComponent,
    InfoMessageComponent,
    InputErrorComponent,
    InputErrorsComponent,
    InputHintLabelComponent,
    InterestLevelInputComponent,
    InterestsInputComponent,
    JobActionsSectionComponent,
    JobAdditionalUserInfoModalComponent,
    JobApplicantSectionComponent,
    JobBannerSectionComponent,
    JobCardComponent,
    JobCommentsSectionComponent,
    JobCompanyDescriptionSectionComponent,
    JobCompanyImageSectionComponent,
    JobDescriptionSection2Component,
    JobExperienceInputComponent,
    JobImportantInformationSectionComponent,
    JobMapMarkerComponent,
    JobPageComponent,
    JobRecruiterSectionComponent,
    JobRequirementsSectionComponent,
    JobsFilterComponent,
    JobShortDescriptionSectionComponent,
    JobsMapComponent,
    JobsPageComponent,
    JobsPagerSectionComponent,
    JobTasksSectionComponent,
    JobTitleSectionComponent,
    SubscribeFormComponent,
    LanguageMenuComponent,
    LanguageProficiencyInputComponent,
    LanguagesInputComponent,
    LastNameInputComponent,
    LinkedinUrlInputComponent,
    LMACardInputComponent,
    LoginFormComponent,
    LoginModalComponent,
    LoginOrRegisterModalComponent,
    LoginPageComponent,
    LostConnectionPageComponent,
    MissingPaymentInformationModalComponent,
    ModalTagsDirective,
    NameInputComponent,
    NavigationMenuComponent,
    NewJobsSectionComponent,
    NewPasswordInputComponent,
    NotFoundPageComponent,
    NumberedPagerComponent,
    OldPasswordInputComponent,
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
    RequirementsSectionComponent,
    ResetPasswordFormComponent,
    ResetPasswordPageComponent,
    ResidencePermitBackInputComponent,
    ResidencePermitFrontInputComponent,
    ResumeInputComponent,
    SearchInputComponent,
    SelectDropdownInputComponent,
    SelectInputComponent,
    ShareModalComponent,
    ShareSectionComponent,
    ShareWithModalSectionComponent,
    SignedForJobModalComponent,
    SignForJobFormComponent,
    SignForJobModalComponent,
    SimpleMessageComponent,
    SkatteverketCertificateInputComponent,
    SkillProficiencyInputComponent,
    SkillsInputComponent,
    SocialMediaSectionComponent,
    SortUsersInputComponent,
    SSNInputComponent,
    StatusInputComponent,
    StepModalComponent,
    StepperModalComponent,
    StreetInputComponent,
    SuccessMessageComponent,
    SupportChatComponent,
    SupportChatPageComponent,
    SystemLanguageInputComponent,
    TermsInputComponent,
    TextareaInputComponent,
    TextInputComponent,
    UploadDocumentCardComponent,
    UploadImageCardComponent,
    UserCardComponent,
    UserDetailsFormComponent,
    UserDocumentCardInputComponent,
    UserImageCardInputComponent,
    UserImageCircularInputComponent,
    UserMissingTraitsMessageComponent,
    UserMissingTraitsNextFormComponent,
    UserProfileBannerSectionComponent,
    UserProfileFormComponent,
    UserProfilePageComponent,
    UsersFilterComponent,
    UserUpdateFormComponent,
    WelcomeBannerSectionComponent,
    WelcomeStep1ModalComponent,
    WelcomeStep2ModalComponent,
    WelcomeStep3ModalComponent,
    WorkPermitBackInputComponent,
    WorkPermitFrontInputComponent,
    UpdateProfileStep1ModalComponent,
    UpdateProfileStep2ModalComponent,
    UpdateProfileStep3ModalComponent,
    UpdateProfileStep4ModalComponent,
    YesNoInputComponent,
    ZipInputComponent,
  ],
  providers: [
    ApiCallService,
    DataStoreService,
    GeolocationService,
    ModalService,
    NavigationService,
    PageOptionsService,
    { provide: LOCALE_ID, useValue: 'en' },
    { provide: ErrorHandler, useClass: RavenErrorHandler },
    { provide: APP_BASE_HREF, useValue: '/' }
  ],
  exports: [ AppComponent ]
})
export class AppModule { }
