import {ApiCallService} from '../../services/api-call.service';
import {User} from '../../models/api-models/user/user';
import {UserFactory} from '../../models/api-models/user/user';
import {Injectable} from '@angular/core';

// CREATE
export interface CreateUserAttributes {
  arbetsformedlingen_registered_at?: Date;
  arrived_at?: Date;
  at_und?: string;
  bank_account?: string;
  city?: string;
  company_id?: string;
  competence_text?: string;
  consent: boolean;
  country_of_origin?: string;
  current_status?: string;
  description?: string;
  education?: string;
  email: string;
  first_name: string;
  gender?: string;
  ignored_notifications?: string[];
  interest_ids?: {id: string, level: number}[];
  job_experience?: string;
  language_id?: string;
  language_ids?: {id: string, proficiency: number}[];
  last_name: string;
  linkedin_url?: string;
  next_of_kin_name?: string;
  next_of_kin_phone?: string;
  occupation_ids?: {id: string, years_of_experience: number}[];
  password?: string;
  phone?: string;
  skill_ids?: {id: string, proficiency: number}[];
  skype_username?: string;
  ssn?: string;
  street?: string;
  system_language_id: string;
  user_image_one_time_tokens?: string[];
  zip?: string;
}

// UPDATE
export interface UpdateUserAttributes {
  arbetsformedlingen_registered_at?: Date;
  arrived_at?: Date;
  at_und?: string;
  bank_account?: string;
  city?: string;
  company_id?: string;
  competence_text?: string;
  country_of_origin?: string;
  current_status?: string;
  description?: string;
  education?: string;
  email?: string;
  first_name?: string;
  gender?: string;
  ignored_notifications?: string[];
  interest_ids?: {id: string, level: number}[];
  job_experience?: string;
  language_id?: string;
  language_ids?: {id: string, proficiency: number}[];
  last_name?: string;
  linkedin_url?: string;
  next_of_kin_name?: string;
  next_of_kin_phone?: string;
  occupation_ids?: {id: string, years_of_experience: number}[];
  phone?: string;
  skill_ids?: {id: string, proficiency: number}[];
  skype_username?: string;
  ssn?: string;
  street?: string;
  system_language_id?: string;
  zip?: string;
}

@Injectable()
export class UserProxy {

  constructor(
    private apiCallService: ApiCallService
  ) {
  }

  // GET
  public getUser(userId: string, searchParameters?: any): Promise<User> {
    return this.apiCallService.get('users/' + userId, searchParameters)
    .then(response => UserFactory.createUser(response.data));
  }

  public getUsers(searchParameters?: any): Promise<User[]> {
    return this.apiCallService.get('users', searchParameters)
    .then(response => response.data.map(user => UserFactory.createUser(user)));
  }

  public getUsersWithMeta(searchParameters?: any): Promise<{users: User[], meta: any}> {
    return this.apiCallService.get('users', searchParameters)
    .then(response => {
      return {
        users: response.data.map(user => UserFactory.createUser(user)),
        meta: response.meta
      }
    });
  }

  public getUsersMatchingJob(jobId: string, searchParameters?: any): Promise<User[]> {
    return this.apiCallService.get('jobs/' + jobId + '/matching_users', searchParameters)
    .then(response => response.data.map(user => UserFactory.createUser(user)));
  }

  public getUsersMatchingJobWithMeta(jobId: string, searchParameters?: any): Promise<{users: User[], meta: any}> {
    return this.apiCallService.get('jobs/' + jobId + '/matching_users', searchParameters)
    .then(response => {
      return {
        users: response.data.map(user => UserFactory.createUser(user)),
        meta: response.meta
      }
    });
  }

  // CREATE
  public createUser(userAttributes: CreateUserAttributes, searchParameters?: any): Promise<User> {
    return this.apiCallService.post('users', userAttributes, searchParameters)
    .then(response => UserFactory.createUser(response.data));
  }

  // UPDATE
  public updateUser(userId: string, userAttributes: UpdateUserAttributes, searchParameters?: any): Promise<User> {
    return this.apiCallService.patch('users/' + userId, userAttributes, searchParameters)
    .then(response => UserFactory.createUser(response.data));
  }

  // REMOVE
  public removeUser(userId: string): Promise<any> {
    return this.apiCallService.delete('users/' + userId);
  }
}
