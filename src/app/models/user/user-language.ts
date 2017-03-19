import {Language} from '../language/language';

export class UserLanguage {
  public id: number;
  public language: Language;
  public proficiency: number;

  public constructor(jsonObject: any) {
    if (!jsonObject) {
      return;
    }

    this.id = jsonObject.id;
    this.language = new Language(jsonObject.language);
    this.proficiency = jsonObject.proficiency;
  }
}
