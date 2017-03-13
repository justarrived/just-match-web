import {Skill} from '../skill/skill';
import {find} from 'lodash';

export class UserSkill {
  id: string;
  skill: Skill;
  proficiency: number;

  constructor(jsonObject: any) {
    this.id = jsonObject.id;
    this.skill = new Skill(jsonObject.skill || {});
    this.proficiency = jsonObject.proficiency;
  }
}
