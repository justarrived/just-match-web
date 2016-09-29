import {NgModule} from "@angular/core";
import {HttpModule} from "@angular/http";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule} from "@angular/forms";

import {TranslateModule} from "ng2-translate/ng2-translate";

import {AppComponent} from "./app.component";
import {TaskListComponent} from "./todo/components/task-list.component";
import {AboutComponent} from "./about/components/about.component";
import {TaskComponent} from "./todo/components/task.component";
import {routing, appRoutingProviders} from "./app.routing";
import {TranslationService} from "./services/translation-service";

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
    AboutComponent
  ],
  providers: [
    appRoutingProviders,
    TranslationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
