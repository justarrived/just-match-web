import {SkillProficiency} from './skill-proficiency';

export class SkillProficiencyLevels {
  static beginner: SkillProficiency = {name: 'skill.proficiency.beginner', proficiency: 1};
  static basic: SkillProficiency = {name: 'skill.proficiency.basic', proficiency: 2};
  static intermediate: SkillProficiency = {name: 'skill.proficiency.intermediate', proficiency: 3};
  static professional: SkillProficiency = {name: 'skill.proficiency.professional', proficiency: 4};
  static expert: SkillProficiency = {name: 'skill.proficiency.expert', proficiency: 5};
}

export const skillProficiencyLevelsList: SkillProficiency[] = Object.keys(SkillProficiencyLevels).map(key => SkillProficiencyLevels[key]);
