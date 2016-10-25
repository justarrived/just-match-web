import {Component, OnInit} from "@angular/core";
import {TranslationService} from "../../services/translation.service";
import {ApiCall} from "../../services/api-call.service";
import {namePropertyLabel} from "../../utils/label-util";
import {CountryProxy} from "../../services/proxy/country-proxy.service";

@Component({
  moduleId: module.id,
  templateUrl: 'about.component.html'
})
export class AboutComponent implements OnInit {

  myModel: any = {value: []};

  namePropertyLabel: Function = namePropertyLabel;

  constructor(private translationService: TranslationService, private apiCall: ApiCall, private countryProxy: CountryProxy) {
  }

  ngOnInit() {

  }

  getData() {
    return (searchText) => {
      return this.countryProxy.getCountries(searchText);
    };
  }
}
