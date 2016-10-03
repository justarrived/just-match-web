import {Component} from "@angular/core";
import {OnInit} from "@angular/core";
import {ApiCall} from "../../services/api-call";

import {TranslationService} from "../../services/translation.service";

@Component({
  templateUrl: './app/about/components/about.html'
})
export class AboutComponent implements OnInit {

  constructor(private translationService: TranslationService, private apiCall: ApiCall) {
  }

  ngOnInit() {

  }
}
