import {NgModule} from '@angular/core';
import {HttpModule} from '@angular/http';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppComponent} from './app.component';
import {AboutComponent} from './views/about/about.component';
import {HomeComponent} from './views/home/home.component';
import {LocalStorageWrapper} from './services/local-storage-wrapper.service';
import {ApiCall} from './services/api-call.service';
import {AuthManager} from './services/auth-manager.service';
import {UserProxy} from './services/proxy/user-proxy.service';
import {ActsAsUser} from './services/acts-as-user.service';
import {TranslationService} from './services/translation.service';
import {SliderComponent} from './components/slider/slider.component';
import {UserRegisterComponent} from './views/user/user-register/user-register.component';
import {CountryProxy} from './services/proxy/country-proxy.service';
import {UserProfileComponent} from './views/user/user-profile/user-profile.component';
import {DeletableItemComponent} from './components/autocomplete-dropdown/deletable-item/deletable-item.component';
import {AutocompleteDropdownListItemComponent} from './components/autocomplete-dropdown/autocomplete-dropdown-list-item/autocomplete-dropdown-list-item.component';
import {AutocompleteDropdownComponent} from './components/autocomplete-dropdown/autocomplete-dropdown.component';
import {LanguageProxy} from './services/proxy/language-proxy.service';
import {LoginComponent} from './views/login/login.component';
import {UserManager} from './services/user-manager.service';
import {JobCreateComponent} from './views/jobs/job-create/job-create.component';
import {JobPreviewComponent} from './components/job-preview/job-preview.component';
import {JobsComponent} from './views/jobs/jobs.component';
import {JobListItemComponent} from './components/job-list-item/job-list-item.component';
import {PagerComponent} from './components/pager/pager.component';
import {JobDetailsComponent} from './views/job-details/job-details.component';
import {CommentsComponent} from './components/comments/comments.component';
import {JobStateStatusBarComponent} from './components/job-state-status-bar/job-state-status-bar.component';
import {FaqComponent} from './views/faq/faq.component';
import {ContactComponent} from './views/contact/contact.component';
import {ContactConfirmationComponent} from './views/contact/confirmation/contact-confirmation.component';
import {ConfirmationComponent} from './views/confirmation/confirmation.component';
import {CandidateComponent} from './views/candidate/candidate.component';
import {CandidateStateStatusBarComponent} from './components/candidate-state-status-bar/candidate-state-status-bar.component';
import {CandidatesComponent} from './views/candidates/candidates.component';
import {MyJobsComponent} from './views/my-jobs/my-jobs.component';
import {CompanyJobsComponent} from './views/my-jobs/company-jobs/company-jobs.component';
import {UserJobsComponent} from './views/my-jobs/user-jobs/user-jobs.component';
import {MyJobsItemComponent} from './components/my-jobs-item/my-jobs-item.component';
import {RatingComponent} from './components/rating/rating.component';
import {AppTranslateModule} from './app.translate.module';
import {AppRoutingModule} from './app.routing.module';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    AppTranslateModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    AboutComponent,
    HomeComponent,
    SliderComponent,
    UserRegisterComponent,
    UserProfileComponent,
    DeletableItemComponent,
    AutocompleteDropdownListItemComponent,
    AutocompleteDropdownComponent,
    LoginComponent,
    JobCreateComponent,
    JobPreviewComponent,
    JobsComponent,
    JobListItemComponent,
    PagerComponent,
    JobDetailsComponent,
    CommentsComponent,
    JobStateStatusBarComponent,
    FaqComponent,
    ContactComponent,
    ContactConfirmationComponent,
    ConfirmationComponent,
    CandidatesComponent,
    CandidateComponent,
    CandidateStateStatusBarComponent,
    RatingComponent,
    MyJobsItemComponent,
    CompanyJobsComponent,
    UserJobsComponent,
    MyJobsComponent
  ],
  providers: [
    LocalStorageWrapper,
    ApiCall,
    AuthManager,
    ActsAsUser,
    UserProxy,
    CountryProxy,
    LanguageProxy,
    TranslationService,
    UserManager,
    // {provide: ErrorHandler, useClass: GlobalExceptionHandler}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
