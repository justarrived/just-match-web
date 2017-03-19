import {Interest} from '../interest/interest';

export class UserInterest {
  public id: string;
  public interest: Interest;
  public proficiency: number;

  public constructor(jsonObject: any) {
    if (!jsonObject) {
      return;
    }

    this.id = jsonObject.id;
    this.interest = new Interest(jsonObject.interest || {});
    this.proficiency = jsonObject.proficiency;
  }
}
