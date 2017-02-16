import {SkillProficiency} from './skill-proficiency';

export class SkillProficiencyLevels {
  static beginner: SkillProficiency = {name: 'Beginner', proficiency: 1};
  static basic: SkillProficiency = {name: 'Basic knowledge', proficiency: 2};
  static intermediate: SkillProficiency = {name: 'Intermediate knowledge', proficiency: 3};
  static professional: SkillProficiency = {name: 'Professional', proficiency: 4};
  static expert: SkillProficiency = {name: 'Expert', proficiency: 5};
}

export const skillProficiencyLevelsList: SkillProficiency[] = Object.keys(SkillProficiencyLevels).map(key => SkillProficiencyLevels[key]);
