import {LanguageProficiency} from '../models/language/language-proficiency';

export const atUndStatuses: any[] = [
  {name: 'Yes', value: 'yes'},
  {name: 'No', value: 'no'}
];

export const languageProficiencyLevels: LanguageProficiency[] = [
  {name: 'Beginner', proficiency: 1},
  {name: 'Basic knowledge', proficiency: 2},
  {name: 'Working proficiency', proficiency: 3},
  {name: 'Professional proficiency', proficiency: 4},
  {name: 'Native speaker', proficiency: 5}
];

export const skillProficiencyLevels: LanguageProficiency[] = [
  {name: 'Beginner', proficiency: 1},
  {name: 'Basic knowledge', proficiency: 2},
  {name: 'Intermediate knowledge', proficiency: 3},
  {name: 'Professional', proficiency: 4},
  {name: 'Expert', proficiency: 5}
];
