import {ApiCallService} from '../../services/api-call.service';
import {Skill} from '../../models/api-models/skill/skill';
import {SkillFactory} from '../../models/api-models/skill/skill';
import {Injectable} from '@angular/core';

// CREATE
interface CreateSkillAttributes {
  name: string;
  language_id: string;
}

// UPDATE
interface UpdateSkillAttributes {
  name?: string;
  language_id?: string;
}

@Injectable()
export class SkillProxy {

  constructor(
    private apiCallService: ApiCallService
  ) {
  }

  // GET
  public getSkill(skillId: string, searchParameters?: any): Promise<Skill> {
    return this.apiCallService.get('skills/' + skillId, searchParameters)
    .then(response => SkillFactory.createSkill(response.data));
  }

  public getSkills(searchParameters?: any): Promise<Skill[]> {
    return this.apiCallService.get('skills', searchParameters)
    .then(response => response.data.map(skill => SkillFactory.createSkill(skill)));
  }

  public getSkillsWithMeta(searchParameters?: any): Promise<{skills: Skill[], meta: {total: number}}> {
    return this.apiCallService.get('skills', searchParameters)
    .then(response => {
      return {
        skills: response.data.map(skill => SkillFactory.createSkill(skill)),
        meta: response.meta
      }
    });
  }

  // CREATE
  public createSkill(skillAttributes: CreateSkillAttributes, searchParameters?: any): Promise<Skill> {
    return this.apiCallService.post('skills', skillAttributes, searchParameters)
    .then(response => SkillFactory.createSkill(response.data));
  }

  // UPDATE
  public updateSkill(skillId: string, skillAttributes: UpdateSkillAttributes, searchParameters?: any): Promise<Skill> {
    return this.apiCallService.patch('skills/' + skillId, skillAttributes, searchParameters)
    .then(response => SkillFactory.createSkill(response.data));
  }

  // REMOVE
  public removeSkill(skillId: string): Promise<any> {
    return this.apiCallService.delete('skills/' + skillId);
  }
}
