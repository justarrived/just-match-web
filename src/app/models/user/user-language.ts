import {Language} from '../language/language';
import {LanguageProficiency} from '../language/language-proficiency';
import {languageProficiencyLevelsList} from '../language/language-proficiency-levels';
import {find} from 'lodash';

export class UserLanguage {
  id: number;
  language: Language;
  proficiency: LanguageProficiency;

  constructor(jsonObject: any) {
    this.id = jsonObject.id;
    this.language = new Language(jsonObject.language || {});
    this.proficiency = find(languageProficiencyLevelsList, proficiencyLevel => proficiencyLevel.proficiency === jsonObject.proficiency);
  }
}
