import {ApiCallService} from '../../services/api-call.service';
import {UserSkill} from '../../models/api-models/user-skill/user-skill';
import {UserSkillFactory} from '../../models/api-models/user-skill/user-skill';
import {Injectable} from '@angular/core';

// CREATE
interface CreateUserSkillAttributes {
  id: string;
  proficiency?: number;
}

@Injectable()
export class UserSkillProxy {

  constructor(
    private apiCallService: ApiCallService
  ) {
  }

  // GET
  public getUserSkill(userId: string, userSkillId: string, searchParameters?: any): Promise<UserSkill> {
    return this.apiCallService.get('users/' + userId + '/skills/' + userSkillId, searchParameters)
    .then(response => UserSkillFactory.createUserSkill(response.data));
  }

  public getUserSkills(userId: string, searchParameters?: any): Promise<UserSkill[]> {
    return this.apiCallService.get('users/' + userId + '/skills', searchParameters)
    .then(response => response.data.map(userSkill => UserSkillFactory.createUserSkill(userSkill)));
  }

  public getUserSkillsWithMeta(userId: string, searchParameters?: any): Promise<{userSkills: UserSkill[], meta: any}> {
    return this.apiCallService.get('users/' + userId + '/skills', searchParameters)
    .then(response => {
      return {
        userSkills: response.data.map(userSkill => UserSkillFactory.createUserSkill(userSkill)),
        meta: response.meta
      }
    });
  }

  // CREATE
  public createUserSkill(userId: string, userSkillAttributes: CreateUserSkillAttributes, searchParameters?: any): Promise<UserSkill> {
    return this.apiCallService.post('users/' + userId + '/skills', userSkillAttributes, searchParameters)
    .then(response => UserSkillFactory.createUserSkill(response.data));
  }

  // REMOVE
  public removeUserSkill(userId: string, userSkillId: string, userSkillAttributes: CreateUserSkillAttributes): Promise<UserSkill> {
    return this.apiCallService.delete('users/' + userId + '/skills/' + userSkillId)
  }
}
