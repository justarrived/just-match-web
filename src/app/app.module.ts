import {NgModule} from '@angular/core';
import {HttpModule} from '@angular/http';
import {BrowserModule} from '@angular/platform-browser';
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
import {RatingComponent} from './components/rating/rating.component';
import {AppTranslateModule} from './app.translate.module';
import {AppRoutingModule} from './app.routing.module';
import {UserSettingsComponent} from './views/user/user-settings/user-settings.component';
import {UserProfileComponent} from './views/user/user-settings/user-profile/user-profile.component';
import {UserDetailsComponent} from './views/user/user-settings/user-details/user-details.component';
import {TranslationItemComponent} from './components/translation-item/translation-item.component';
import {AutosizeDirective} from './components/textarea-autosize/textarea-autosize.directive';
import {Geolocation} from './services/geolocation.service';
import {ErrorComponent} from './views/error/error.component';
import {NotFoundComponent} from './views/404/404.component';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    AppTranslateModule,
    AppRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyABLDG-8LXDMSp6vsTNNI2uSPCWA4eNs-Y'
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
    RatingComponent,
    MyJobsItemComponent,
    UserJobsComponent,
    MyJobsComponent,
    UserSettingsComponent,
    TranslationItemComponent,
    AutosizeDirective,
    ErrorComponent,
    NotFoundComponent
  ],
  providers: [
    DataStore,
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
    NavigationService
    // {provide: ErrorHandler, useClass: GlobalExceptionHandler}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
