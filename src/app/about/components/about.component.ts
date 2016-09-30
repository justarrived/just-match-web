import {Component} from "@angular/core";
import {OnInit} from "@angular/core";

import {TranslationService} from "../../services/translation.service";

@Component({
  templateUrl: './app/about/components/about.html'
})
export class AboutComponent implements OnInit {
  public translationService: TranslationService;

  constructor(translationService: TranslationService) {
    this.translationService = translationService;
  }

  ngOnInit() {

  }
}
