import {Injectable} from '@angular/core';
import {ApiCall} from '../api-call.service';
import {map} from 'lodash';
import {Skill} from '../../models/skill/skill';

@Injectable()
export class SkillProxy {

  constructor(private apiCall: ApiCall) { }

  getSkills(name: string = ''): Promise<Array<Skill>> {
    return this.apiCall.get('skills', {'filter[name]': name})
      .then(response => map(response.data, data => new Skill(data)));
  }
}
