import {Injectable} from '@angular/core';
import {ApiCall} from '../api-call.service';
import {map} from 'lodash';
import {Skill} from '../../models/skill/skill';

@Injectable()
export class SkillProxy {

  constructor(
    private apiCall: ApiCall
  ) {
  }

  public getSkill(id: string): Promise<Skill> {
    return this.apiCall.get('skills/' + id)
      .then(response => new Skill(response.data));
  }

  public getSkills(name: string = '', sort: string = 'name', pageSize: number = 500, pageNumber: number = 1): Promise<Array<Skill>> {
    return this.apiCall.get('skills', {'filter[name]': name, 'sort': name, 'page[size]': pageSize, 'page[number]': pageNumber})
      .then(response => map(response.data, data => new Skill(data)));
  }
}
