import {ApiCallService} from '../../services/api-call.service';
import {Application} from '../../models/api-models/application/application';
import {ApplicationFactory} from '../../models/api-models/application/application';
import {Injectable} from '@angular/core';

// CREATE
interface CreateApplicationAttributes {
  apply_message?: string;
  language_id?: string;
  user_id: string;
}

@Injectable()
export class ApplicationProxy {

  constructor(
    private apiCallService: ApiCallService
  ) {
  }

  // GET
  public getApplication(jobId: string, applicationId: string, searchParameters?: any): Promise<Application> {
    return this.apiCallService.get('jobs/' + jobId + '/users/' + applicationId, searchParameters)
    .then(response => ApplicationFactory.createApplication(response.data));
  }

  public getJobApplications(jobId: string, searchParameters?: any): Promise<Application[]> {
    return this.apiCallService.get('jobs/' + jobId + '/users', searchParameters)
    .then(response => response.data.map(application => ApplicationFactory.createApplication(application)));
  }

  public getJobApplicationsWithMeta(jobId: string, searchParameters?: any): Promise<{applications: Application[], meta: {total: number}}> {
    return this.apiCallService.get('jobs/' + jobId + '/users', searchParameters)
    .then(response => {
      return {
        applications: response.data.map(application => ApplicationFactory.createApplication(application)),
        meta: response.meta
      }
    });
  }

  public getUserApplications(userId: string, searchParameters?: any): Promise<Application[]> {
    return this.apiCallService.get('users/' + userId + '/jobs', searchParameters)
    .then(response => response.data.map(application => ApplicationFactory.createApplication(application)));
  }

  public getUserApplicationsWithMeta(userId: string, searchParameters?: any): Promise<{applications: Application[], meta: {total: number}}> {
    return this.apiCallService.get('users/' + userId + '/jobs', searchParameters)
    .then(response => {
      return {
        applications: response.data.map(application => ApplicationFactory.createApplication(application)),
        meta: response.meta
      }
    });
  }

  // CREATE
  public createApplication(jobId: string, applicationAttributes: CreateApplicationAttributes): Promise<Application> {
    return this.apiCallService.post('jobs/' + jobId + '/users', applicationAttributes)
    .then(response => ApplicationFactory.createApplication(response.data));
  }

  // UPDATE
  public acceptApplication(jobId: string, applicationId: string): Promise<Application> {
    return this.apiCallService.post('jobs/' + jobId + '/users/' + applicationId + '/acceptances')
    .then(response => ApplicationFactory.createApplication(response.data));
  }

  public confirmApplication(jobId: string, applicationId: string): Promise<Application> {
    return this.apiCallService.post('jobs/' + jobId + '/users/' + applicationId + '/confirmations')
    .then(response => ApplicationFactory.createApplication(response.data));
  }

  // REMOVE
  public removeApplication(jobId: string, applicationId: string): Promise<any> {
    return this.apiCallService.delete('jobs/' + jobId + '/users/' + applicationId);
  }
}
