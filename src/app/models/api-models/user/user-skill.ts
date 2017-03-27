import {Skill} from '../skill/skill';
import {SkillFactory} from '../skill/skill';
import {User} from '../user/user';
import {UserFactory} from '../user/user';

// API attribute interfaces
interface UserSkillApiAttributes {
  id: string;
  proficiency: number;
  skill: Skill;
  user: User;
}

// Client interfaces
export interface UserSkill extends UserSkillApiAttributes {
}

// Factories
export class UserSkillFactory {
  public static createUserSkill(jsonObject?: any): UserSkill {
    if (!jsonObject) {
      return;
    }

    return {
      id: jsonObject.id,
      proficiency: jsonObject.proficiency,
      skill: SkillFactory.createSkill(jsonObject.skill),
      user: UserFactory.createUser(jsonObject.user),
    };
  }
}
