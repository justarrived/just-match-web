import {LanguageProficiency} from './language-proficiency';

export class LanguageProficiencyLevels {
  static beginner: LanguageProficiency = {name: 'language.proficiency.beginner', proficiency: 1};
  static basic: LanguageProficiency = {name: 'language.proficiency.basic', proficiency: 2};
  static intermediate: LanguageProficiency = {name: 'language.proficiency.intermediate', proficiency: 3};
  static professional: LanguageProficiency = {name: 'language.proficiency.professional', proficiency: 4};
  static expert: LanguageProficiency = {name: 'language.proficiency.expert', proficiency: 5};
}

export const languageProficiencyLevelsList: LanguageProficiency[] = Object.keys(LanguageProficiencyLevels).map(key => LanguageProficiencyLevels[key]);
