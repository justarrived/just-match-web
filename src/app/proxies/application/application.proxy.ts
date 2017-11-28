import {ApiCallService} from '../../services/api-call.service';
import {Application} from '../../models/api-models/application/application';
import {ApplicationFactory} from '../../models/api-models/application/application';
import {Injectable} from '@angular/core';

// CREATE
export interface CreateApplicationAttributes {
  apply_message?: string;
  http_referrer?: string;
  language_id?: string;
  user_id: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_medium?: string;
  utm_source?: string;
  utm_term?: string;
}

// UPDATE
export interface ConfirmApplicationAttributes {
  consent: boolean;
  terms_agreement_id?: string;
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

  public getUserApplicationForJob(userId: string, jobId: string, searchParameters?: any): Promise<Application> {
    return this.apiCallService.get('jobs/' + jobId + '/users/' + userId + '/job-user', searchParameters)
    .then(response => ApplicationFactory.createApplication(response.data));
  }

  public getJobApplications(jobId: string, searchParameters?: any): Promise<Application[]> {
    return this.apiCallService.get('jobs/' + jobId + '/users', searchParameters)
    .then(response => response.data.map(application => ApplicationFactory.createApplication(application)));
  }

  public getJobApplicationsWithMeta(jobId: string, searchParameters?: any): Promise<{applications: Application[], meta: any}> {
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

  public getUserApplicationsWithMeta(userId: string, searchParameters?: any): Promise<{applications: Application[], meta: any}> {
    return this.apiCallService.get('users/' + userId + '/jobs', searchParameters)
    .then(response => {
      return {
        applications: response.data.map(application => ApplicationFactory.createApplication(application)),
        meta: response.meta
      }
    });
  }

  // CREATE
  public createApplication(jobId: string, applicationAttributes: CreateApplicationAttributes, searchParameters?: any): Promise<Application> {
    return this.apiCallService.post('jobs/' + jobId + '/users', applicationAttributes, searchParameters)
    .then(response => ApplicationFactory.createApplication(response.data));
  }

  // UPDATE
  public acceptApplication(jobId: string, applicationId: string, searchParameters?: any): Promise<Application> {
    return this.apiCallService.post('jobs/' + jobId + '/users/' + applicationId + '/acceptances', {}, searchParameters)
    .then(response => ApplicationFactory.createApplication(response.data));
  }

  public confirmApplication(jobId: string, applicationId: string, confirmApplicationAttributes: ConfirmApplicationAttributes, searchParameters?: any): Promise<Application> {
    return this.apiCallService.post('jobs/' + jobId + '/users/' + applicationId + '/confirmations', confirmApplicationAttributes, searchParameters)
    .then(response => ApplicationFactory.createApplication(response.data));
  }

  // REMOVE
  public removeApplication(jobId: string, applicationId: string): Promise<any> {
    return this.apiCallService.delete('jobs/' + jobId + '/users/' + applicationId);
  }
}
