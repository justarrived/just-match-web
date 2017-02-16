import {Skill} from '../skill/skill';
import {SkillProficiency} from '../skill/skill-proficiency';
import {skillProficiencyLevelsList} from '../skill/skill-proficiency-levels';
import {find} from 'lodash';

export class UserSkill {
  id: string;
  skill: Skill;
  proficiency: SkillProficiency;

  constructor(jsonObject: any) {
    this.id = jsonObject.id;
    this.skill = new Skill(jsonObject.skill || {});
    this.proficiency = find(skillProficiencyLevelsList, proficiencyLevel => proficiencyLevel.proficiency === jsonObject.proficiency);
  }
}
