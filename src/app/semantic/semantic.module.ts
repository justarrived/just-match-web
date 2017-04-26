import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {NgModule} from "@angular/core";
import {ReactiveFormsModule} from "@angular/forms";
import {SemanticAccordionComponent} from "./accordion/accordion";
import {SemanticAccordionItemComponent} from "./accordion/accordion";
import {SemanticButtonComponent} from "./button/button";
import {SemanticCardComponent} from "./card/card";
import {SemanticCardsComponent} from "./card/card";
import {SemanticCheckboxComponent} from "./input/input";
import {SemanticContextMenuComponent} from "./contextmenu/contextmenu";
import {SemanticDimmerComponent} from "./dimmer/dimmer";
import {SemanticDropdownComponent} from "./dropdown/dropdown";
import {SemanticFlagComponent} from "./flag/flag";
import {SemanticInputComponent} from "./input/input";
import {SemanticItemComponent} from "./item/item";
import {SemanticListComponent} from "./list/list";
import {SemanticLoaderComponent} from "./loader/loader";
import {SemanticMenuComponent} from "./menu/menu";
import {SemanticMessageComponent} from "./message/message";
import {SemanticModalComponent} from "./modal/modal";
import {SemanticPopupComponent} from "./popup/popup";
import {SemanticProgressComponent} from "./progress/progress";
import {SemanticRatingComponent} from "./rating/rating";
import {SemanticSearchComponent} from "./search/search";
import {SemanticSegmentComponent} from "./segment/segment";
import {SemanticSelectComponent} from "./select/select";
import {SemanticShapeComponent} from "./shape/shape";
import {SemanticSidebarComponent} from "./sidebar/sidebar";
import {SemanticTabComponent} from "./tab/tab";
import {SemanticTabsComponent} from "./tab/tab";
import {SemanticTextareaComponent} from "./input/input";
import {SemanticTransitionComponent} from "./transition/transition";
import {SMAutosizeDirective} from './autosize/autosize';
import {SMDeviceVisibilityDirective} from "./visibility/visibility";
import {SMModalTagsDirective} from "./modal/modal";
import {SMTooltipDirective} from "./popup/tooltip";
import {SMVisibilityDirective} from "./visibility/visibility";

export let SEMANTIC_COMPONENTS: Array<any> = [
  SemanticAccordionComponent,
  SemanticAccordionItemComponent,
  SemanticButtonComponent,
  SemanticCardComponent,
  SemanticCardsComponent,
  SemanticCheckboxComponent,
  SemanticContextMenuComponent,
  SemanticDimmerComponent,
  SemanticDropdownComponent,
  SemanticFlagComponent,
  SemanticInputComponent,
  SemanticItemComponent,
  SemanticListComponent,
  SemanticLoaderComponent,
  SemanticMenuComponent,
  SemanticMessageComponent,
  SemanticModalComponent,
  SemanticPopupComponent,
  SemanticProgressComponent,
  SemanticRatingComponent,
  SemanticSearchComponent,
  SemanticSegmentComponent,
  SemanticSelectComponent,
  SemanticShapeComponent,
  SemanticSidebarComponent,
  SemanticTabComponent,
  SemanticTabsComponent,
  SemanticTextareaComponent,
  SemanticTransitionComponent,
];

export let SEMANTIC_DIRECTIVES: Array<any> = [
  SMAutosizeDirective,
  SMDeviceVisibilityDirective,
  SMModalTagsDirective,
  SMTooltipDirective,
  SMVisibilityDirective,
];

@NgModule({
  declarations: [SEMANTIC_DIRECTIVES, SEMANTIC_COMPONENTS],
  exports: [SEMANTIC_COMPONENTS, SEMANTIC_DIRECTIVES],
  imports: [CommonModule, FormsModule, ReactiveFormsModule]
})
export class SemanticModule { }
