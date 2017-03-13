import {Language} from '../language/language';
import {find} from 'lodash';

export class UserLanguage {
  id: number;
  language: Language;
  proficiency: number;

  constructor(jsonObject: any) {
    this.id = jsonObject.id;
    this.language = new Language(jsonObject.language || {});
    this.proficiency = jsonObject.proficiency;
  }
}
