import {Angulartics2} from 'angulartics2';
import {Injectable} from '@angular/core';

@Injectable()
export class AnalyticsService {

  public constructor(
    private angulartics2: Angulartics2
  ) {
  }

  public publishEvent(action: string, properties?: any, ) {
    this.angulartics2.eventTrack.next({
      action: action,
      properties: properties
    });
  }
}

export enum AnalyticsActions {
    ApplyForJobFail = "ApplyForJobFail",
    ApplyForJobSuccess = "ApplyForJobSuccess",
    ApplyForJobTry = "ApplyForJobTry",
    CreateSubscriptionFail = "CreateSubscriptionFail",
    CreateSubscriptionSuccess = "CreateSubscriptionSuccess",
    CreateSubscriptionTry = "CreateSubscriptionTry",
    DeleteSubscriptionFail = "DeleteSubscriptionFail",
    DeleteSubscriptionSuccess = "DeleteSubscriptionSuccess",
    DeleteSubscriptionTry = "DeleteSubscriptionTry",
    LoginFail = "LoginFail",
    LoginSuccess = "LoginSuccess",
    LoginTry = "LoginTry",
    CreateUserFail = "CreateUserFail",
    CreateUserSuccess = "CreateUserSuccess",
    CreateUserTry = "CreateUserTry",
    SignForJobFail = "SignForJobFail",
    SignForJobSuccess = "SignForJobSuccess",
    SignForJobTry = "SignForJobTry",
    UpdateSubscriptionFail = "UpdateSubscriptionFail",
    UpdateSubscriptionSuccess = "UpdateSubscriptionSuccess",
    UpdateSubscriptionTry = "UpdateSubscriptionTry",
    UpdateUserFail = "UpdateUserFail",
    UpdateUserSuccess = "UpdateUserSuccess",
    UpdateUserTry = "UpdateUserTry",
    UploadResumeFail = "UploadResumeFail",
    UploadResumeSuccess = "UploadResumeSuccess",
    UploadResumeTry = "UploadResumeTry",
}
