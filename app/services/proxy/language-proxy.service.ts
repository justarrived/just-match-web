import {Injectable} from "@angular/core";
import {ApiCall} from "../api-call.service";
import {map} from "lodash";
import {Language} from "../../models/language";

@Injectable()
export class LanguageProxy {

  constructor(private apiCall: ApiCall) { }

  getLanguages(name: string = '', sort: string = 'en_name', pageSize: number = 25, pageNumber: number = 1): Promise<Array<Language>> {
    return this.apiCall.get('languages', {'filter[en_name]': name, 'sort': sort, 'page[size]': pageSize, 'page[number]': pageNumber})
      .then(response => map(response.data, data => new Language(data)));
  }

}
