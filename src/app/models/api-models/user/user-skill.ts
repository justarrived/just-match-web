import {Skill} from '../skill/skill';

export class UserSkill {
  // API fields
  public id: string;
  public proficiency: number;
  public skill: Skill;

  public constructor(jsonObject?: any) {
    if (!jsonObject) {
      return;
    }

    this.id = jsonObject.id;
    this.proficiency = jsonObject.proficiency;
    this.skill = new Skill(jsonObject.skill);
  }
}
