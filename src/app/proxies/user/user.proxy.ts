import {ApiCall} from '../../services/api-call.service';
import {User} from '../../models/api-models/user/user';
import {UserFactory} from '../../models/api-models/user/user';
import {Injectable} from '@angular/core';

// CREATE
interface CreateUserAttributes {
  account_clearing_number?: string;
  account_number?: string;
  arbetsformedlingen_registered_at?: Date;
  arrived_at?: Date;
  at_und?: string;
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
  interest_ids?: {id: string, proficiency: number}[]; // TODO check why required in docs.
  job_experience?: string;
  language_id?: string;
  language_ids?: {id: string, proficiency: number}[]; // TODO check why required in docs.
  last_name: string;
  next_of_kin_name?: string;
  next_of_kin_phone?: string;
  password?: string;
  phone?: string;
  skill_ids?: {id: string, proficiency: number}[]; // TODO check why required in docs.
  skype_username?: string;
  ssn?: string;
  street?: string;
  system_language_id: string;
  user_image_one_time_tokens?: string[];
  zip?: string;
}

// UPDATE
interface UpdateUserAttributes {
  account_clearing_number?: string;
  account_number?: string;
  arbetsformedlingen_registered_at?: Date;
  arrived_at?: Date;
  at_und?: string;
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
  interest_ids?: {id: string, proficiency: number}[];
  job_experience?: string;
  language_id?: string;
  language_ids?: {id: string, proficiency: number}[];
  last_name?: string;
  next_of_kin_name?: string;
  next_of_kin_phone?: string;
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
    private apiCall: ApiCall
  ) {
  }

  // GET
  public getUser(userId: string, searchParameters?: any): Promise<User> {
    return this.apiCall.get('users/' + userId, searchParameters)
    .then(response => UserFactory.createUser(response.data));
  }

  public getUsers(searchParameters?: any): Promise<User[]> {
    return this.apiCall.get('users', searchParameters)
    .then(response => response.data.map(user => UserFactory.createUser(user)));
  }

  public getUsersWithMeta(searchParameters?: any): Promise<{users: User[], meta: {total: number}}> {
    return this.apiCall.get('users', searchParameters)
    .then(response => {
      return {
        users: response.data.map(user => UserFactory.createUser(user)),
        meta: response.meta
      }
    });
  }

  public getUsersMatchingJob(jobId: string, searchParameters?: any): Promise<User[]> {
    return this.apiCall.get('jobs/' + jobId + '/matching_users', searchParameters)
    .then(response => response.data.map(user => UserFactory.createUser(user)));
  }

  public getUsersMatchingJobWithMeta(jobId: string, searchParameters?: any): Promise<{users: User[], meta: {total: number}}> {
    return this.apiCall.get('jobs/' + jobId + '/matching_users', searchParameters)
    .then(response => {
      return {
        users: response.data.map(user => UserFactory.createUser(user)),
        meta: response.meta
      }
    });
  }

  // CREATE
  public createUser(userAttributes: CreateUserAttributes): Promise<User> {
    return this.apiCall.post('users', userAttributes)
    .then(response => UserFactory.createUser(response.data));
  }

  // UPDATE
  public updateUser(userId: string, userAttributes: UpdateUserAttributes): Promise<User> {
    return this.apiCall.patch('users/' + userId, userAttributes)
    .then(response => UserFactory.createUser(response.data));
  }

  // REMOVE
  public removeUser(userId: string): Promise<any> {
    return this.apiCall.delete('users/' + userId);
  }
}
