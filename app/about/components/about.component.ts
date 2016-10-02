import {Component} from "@angular/core";
import {OnInit} from "@angular/core";

import {TranslationService} from "../../services/translation.service";

@Component({
  moduleId: module.id,
  templateUrl: 'about.html'
})
export class AboutComponent implements OnInit {
  public translationService: TranslationService;

  constructor(translationService: TranslationService) {
    this.translationService = translationService;
  }

  ngOnInit() {

  }
}
