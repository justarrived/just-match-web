import "./rxjs-extensions";
import {NgModule, ErrorHandler} from "@angular/core";
import {HttpModule} from "@angular/http";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule} from "@angular/forms";
import {TranslateModule} from "ng2-translate/ng2-translate";
import {AppComponent} from "./app.component";
import {TaskListComponent} from "./views/todo/task-list.component";
import {AboutComponent} from "./views/about/about.component";
import {TaskComponent} from "./components/task/task.component";
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
import {Ng2AutoCompleteModule} from "ng2-auto-complete";
import {CountryProxy} from "./services/proxy/country-proxy.service";
import {LanguageProxy} from "./services/proxy/language-proxy.service";

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    Ng2AutoCompleteModule,
    TranslateModule.forRoot(),
    routing
  ],
  declarations: [
    AppComponent,
    TaskComponent,
    TaskListComponent,
    AboutComponent,
    HomeComponent,
    SliderComponent,
    UserRegisterComponent
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
    {provide: ErrorHandler, useClass: GlobalExceptionHandler}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
