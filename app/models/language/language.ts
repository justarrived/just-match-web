import {LanguageProficiency} from "./language-proficiency";

export class Language {
  id: number;
  name: string;
  code: string;
  proficiency: LanguageProficiency;

  constructor(jsonObject: any) {
    this.id = jsonObject.id;
    this.name = jsonObject.en_name;
    this.code = jsonObject.lang_code;
  }
}
