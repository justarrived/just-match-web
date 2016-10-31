import {Component} from "@angular/core";
import {TranslationService} from "../../services/translation.service";

@Component({
  moduleId: module.id,
  templateUrl: 'about.component.html'
})
export class AboutComponent {

  constructor(private translationService: TranslationService) {}
}
