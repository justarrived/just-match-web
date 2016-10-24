import {Component, OnInit} from "@angular/core";
import {TranslationService} from "../../services/translation.service";
import {ApiCall} from "../../services/api-call.service";
import {namePropertyLabel} from "../../utils/label-util";

@Component({
  moduleId: module.id,
  templateUrl: 'about.component.html'
})
export class AboutComponent implements OnInit {

  myModel: any = {value: 'baba'};

  namePropertyLabel: Function = namePropertyLabel;

  constructor(private translationService: TranslationService, private apiCall: ApiCall) {
  }

  ngOnInit() {

  }
}
