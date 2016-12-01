import {Component} from "@angular/core";
import {TranslationService} from "../../services/translation.service";

@Component({
  templateUrl: './about.component.html'
})
export class AboutComponent {

  constructor(private translationService: TranslationService) {}
}
