import {LanguageProficiency} from './language-proficiency';

export class LanguageProficiencyLevels {
  static beginner: LanguageProficiency = {name: 'Beginner', proficiency: 1};
  static basic: LanguageProficiency = {name: 'Basic knowledge', proficiency: 2};
  static intermediate: LanguageProficiency = {name: 'Working proficiency', proficiency: 3};
  static professional: LanguageProficiency = {name: 'Professional proficiency', proficiency: 4};
  static expert: LanguageProficiency = {name: 'Native speaker', proficiency: 5};
}

export const languageProficiencyLevelsList: LanguageProficiency[] = Object.keys(LanguageProficiencyLevels).map(key => LanguageProficiencyLevels[key]);
