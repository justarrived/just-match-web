import {NgModule} from "@angular/core";
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
