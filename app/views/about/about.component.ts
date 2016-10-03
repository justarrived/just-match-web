import {Component, OnInit} from "@angular/core";
import {TranslationService} from "../../services/translation.service";
import {ApiCall} from "../../services/api-call.service";

@Component({
  moduleId: module.id,
  templateUrl: 'about.component.html'
})
export class AboutComponent implements OnInit {

  constructor(private translationService: TranslationService, private apiCall: ApiCall) {
  }

  ngOnInit() {

  }
}
