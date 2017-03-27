import {Job} from '../job/job';
import {JobFactory} from '../job/job';
import {Skill} from '../skill/skill';
import {SkillFactory} from '../skill/skill';

// API attribute interfaces
interface JobSkillApiAttributes {
  id: string;
  job: Job;
  skill: Skill;
}

// Client interfaces
export interface JobSkill extends JobSkillApiAttributes {
}

// Factories
export class JobSkillFactory {
  public static createJobSkill(jsonObject?: any): JobSkill {
    if (!jsonObject) {
      return;
    }

    return {
      id: jsonObject.id,
      skill: SkillFactory.createSkill(jsonObject.skill),
      job: JobFactory.createJob(jsonObject.job),
    };
  }
}
