import {Injectable} from "@angular/core";
import {ApiCall} from "../api-call.service";
import {map} from "lodash";
import {Language} from "../../models/language";

@Injectable()
export class LanguageProxy {

  constructor(private apiCall: ApiCall) { }

  getSystemLanguages(): Promise<Array<Language>> {
    return this.apiCall.get('languages', {'filter[system_language]': true})
      .then(response => map(response.data, data => new Language(data)));
  }

}
