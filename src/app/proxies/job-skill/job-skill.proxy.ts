import {ApiCallService} from '../../services/api-call.service';
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
    private apiCallService: ApiCallService
  ) {
  }

  // GET
  public getJobSkill(jobId: string, jobSkillId: string, searchParameters?: any): Promise<JobSkill> {
    return this.apiCallService.get('jobs/' + jobId + 'skills/' + jobSkillId, searchParameters)
    .then(response => JobSkillFactory.createJobSkill(response.data));
  }

  public getJobSkills(jobId: string, searchParameters?: any): Promise<JobSkill[]> {
    return this.apiCallService.get('jobs/' + jobId + 'skills', searchParameters)
    .then(response => response.data.map(jobSkill => JobSkillFactory.createJobSkill(jobSkill)));
  }

  public getJobSkillsWithMeta(jobId: string, searchParameters?: any): Promise<{jobSkills: JobSkill[], meta: any}> {
    return this.apiCallService.get('jobs/' + jobId + 'skills', searchParameters)
    .then(response => {
      return {
        jobSkills: response.data.map(jobSkill => JobSkillFactory.createJobSkill(jobSkill)),
        meta: response.meta
      }
    });
  }

  // CREATE
  public createJobSkill(jobId: string, jobSkillAttributes: CreateJobSkillAttributes, searchParameters?: any): Promise<JobSkill> {
    return this.apiCallService.post('jobs/' + jobId + 'skills', jobSkillAttributes, searchParameters)
    .then(response => JobSkillFactory.createJobSkill(response.data));
  }

  // REMOVE
  public removeJobSkill(jobId: string, jobSkillId: string): Promise<any> {
    return this.apiCallService.delete('jobs/' + jobId + 'skills/' + jobSkillId);
  }
}
