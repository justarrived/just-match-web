import "./rxjs-extensions";
import {NgModule, ErrorHandler} from "@angular/core";
import {HttpModule} from "@angular/http";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule} from "@angular/forms";
import {TranslateModule} from "ng2-translate/ng2-translate";
import {AppComponent} from "./app.component";
import {AboutComponent} from "./views/about/about.component";
import {HomeComponent} from "./views/home/home.component";
import {routing, appRoutingProviders} from "./app.routing";
import {LocalStorageWrapper} from "./services/local-storage-wrapper.service";
import {ApiCall} from "./services/api-call.service";
import {AuthManager} from "./services/auth-manager.service";
import {UserProxy} from "./services/user-proxy.service";
import {TranslationService} from "./services/translation.service";
import {GlobalExceptionHandler} from "./config/global-exception-handler";
import {SliderComponent} from "./components/slider/slider.component";
import {UserRegisterComponent} from "./views/user/user-register/user-register.component";
import {CountryProxy} from "./services/proxy/country-proxy.service";
import {UserProfileComponent} from "./views/user/user-profile/user-profile.component";
import {DeletableItemComponent} from "./components/autocomplete-dropdown/deletable-item/deletable-item.component";
import {AutocompleteDropdownListItemComponent} from "./components/autocomplete-dropdown/autocomplete-dropdown-list-item/autocomplete-dropdown-list-item.component";
import {AutocompleteDropdownComponent} from "./components/autocomplete-dropdown/autocomplete-dropdown.component";
import {LanguageProxy} from "./services/proxy/language-proxy.service";
import {LoginComponent} from "./views/login/login.component";
import {UserManager} from "./user-manager.service";
import {JobCreateComponent} from "./views/jobs/job-create/job-create.component";
import {JobProxy} from "./services/job-proxy.service";
import {JobApproveComponent} from "./views/jobs/job-approve/job-approve.component";
import {JobsComponent} from "./views/jobs/jobs.component";
import {JobListItemComponent} from "./components/job-list-item/job-list-item.component";
import {PagerComponent} from "./components/pager/pager.component";

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    TranslateModule.forRoot(),
    routing
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
    JobApproveComponent,
    JobsComponent,
    JobListItemComponent,
    PagerComponent
  ],
  providers: [
    appRoutingProviders,
    LocalStorageWrapper,
    ApiCall,
    AuthManager,
    UserProxy,
    CountryProxy,
    LanguageProxy,
    TranslationService,
    UserManager,
    JobProxy,
    {provide: ErrorHandler, useClass: GlobalExceptionHandler}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
