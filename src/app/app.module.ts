import {NgModule} from "@angular/core";
import {HttpModule} from "@angular/http";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule} from "@angular/forms";
import {TranslateModule} from "ng2-translate/ng2-translate";
import {AppComponent} from "./app.component";
import {TaskListComponent} from "./todo/components/task-list.component";
import {AboutComponent} from "./about/components/about.component";
import {TaskComponent} from "./todo/components/task.component";
import {HomeComponent} from "./home/components/home.component";
import {routing, appRoutingProviders} from "./app.routing";
import {LocalStorageWrapper} from "./services/local-storage-wrapper";
import {ApiCall} from "./services/api-call";
import {AuthManager} from "./services/auth-manager.service";
import {UserProxy} from "./services/user-proxy.service";
import {TranslationService} from "./services/translation.service";

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
    TaskComponent,
    TaskListComponent,
    AboutComponent,
    HomeComponent
  ],
  providers: [
    appRoutingProviders,
    LocalStorageWrapper,
    ApiCall,
    AuthManager,
    UserProxy,
    TranslationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
