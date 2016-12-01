import {Injectable} from "@angular/core";
import {LanguageProxy} from "./proxy/language-proxy.service";
import {orderBy} from "lodash";
import {Language} from "../models/language/language";

@Injectable()
export class SystemLanguagesService {
  private languages: Language[];
  private languagesPromise: Promise<any>;

  constructor(private languageProxy: LanguageProxy) {
    this.languagesPromise = this.languageProxy.getSystemLanguages().then(result => this.languages = orderBy(result, ['languageCode']));
  }

  public getSystemLanguages(): Promise<any> {
    if (this.languages) {
      return Promise.resolve(this.languages);
    }

    return this.languagesPromise;
  }

}
