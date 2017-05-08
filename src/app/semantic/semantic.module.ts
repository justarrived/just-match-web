import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {NgModule} from "@angular/core";
import {ReactiveFormsModule} from "@angular/forms";
import {SemanticAccordionComponent} from "./accordion/accordion";
import {SemanticAccordionItemComponent} from "./accordion/accordion";
import {SemanticCheckboxComponent} from "./input/input";
import {SemanticInputComponent} from "./input/input";
import {SemanticLoaderComponent} from "./loader/loader";
import {SemanticMessageComponent} from "./message/message";
import {SemanticModalComponent} from "./modal/modal";
import {SemanticRatingComponent} from "./rating/rating";
import {SemanticSearchComponent} from "./search/search";
import {SemanticSelectComponent} from "./select/select";
import {SemanticSidebarComponent} from "./sidebar/sidebar";
import {SemanticTextareaComponent} from "./input/input";
import {SMAutosizeDirective} from './autosize/autosize';
import {SMModalTagsDirective} from "./modal/modal";

export let SEMANTIC_COMPONENTS: Array<any> = [
  SemanticAccordionComponent,
  SemanticAccordionItemComponent,
  SemanticCheckboxComponent,
  SemanticInputComponent,
  SemanticLoaderComponent,
  SemanticMessageComponent,
  SemanticModalComponent,
  SemanticRatingComponent,
  SemanticSearchComponent,
  SemanticSelectComponent,
  SemanticSidebarComponent,
  SemanticTextareaComponent,
];

export let SEMANTIC_DIRECTIVES: Array<any> = [
  SMAutosizeDirective,
  SMModalTagsDirective,
];

@NgModule({
  declarations: [SEMANTIC_DIRECTIVES, SEMANTIC_COMPONENTS],
  exports: [SEMANTIC_COMPONENTS, SEMANTIC_DIRECTIVES],
  imports: [CommonModule, FormsModule, ReactiveFormsModule]
})
export class SemanticModule { }
