import {ApiCall} from '../../services/api-call.service';
import {Injectable} from '@angular/core';
import {JobSkill} from '../../models/api-models/job-skill/job-skill';
import {JobSkillFactory} from '../../models/api-models/job-skill/job-skill';

// CREATE
interface CreateJobSkillAttributes {
  id: string;
}

@Injectable()
export class JobSkillProxy {

  constructor(
    private apiCall: ApiCall
  ) {
  }

  // GET
  public getJobSkill(jobId: string, jobSkillId: string, searchParameters?: any): Promise<JobSkill> {
    return this.apiCall.get('jobs/' + jobId + 'skills/' + jobSkillId, searchParameters)
    .then(response => JobSkillFactory.createJobSkill(response.data));
  }

  public getJobSkills(jobId: string, searchParameters?: any): Promise<JobSkill[]> {
    return this.apiCall.get('jobs/' + jobId + 'skills', searchParameters)
    .then(response => response.data.map(jobSkill => JobSkillFactory.createJobSkill(jobSkill)));
  }

  public getJobSkillsWithMeta(jobId: string, searchParameters?: any): Promise<{jobSkills: JobSkill[], meta: {total: number}}> {
    return this.apiCall.get('jobs/' + jobId + 'skills', searchParameters)
    .then(response => {
      return {
        jobSkills: response.data.map(jobSkill => JobSkillFactory.createJobSkill(jobSkill)),
        meta: response.meta
      }
    });
  }

  // CREATE
  public createJobSkill(jobId: string, jobSkillAttributes: CreateJobSkillAttributes): Promise<JobSkill> {
    return this.apiCall.post('jobs/' + jobId + 'skills', jobSkillAttributes)
    .then(response => JobSkillFactory.createJobSkill(response.data));
  }

  // REMOVE
  public removeJobSkill(jobId: string, jobSkillId: string): Promise<any> {
    return this.apiCall.delete('jobs/' + jobId + 'skills/' + jobSkillId);
  }
}