import {Interest} from '../interest/interest';

export class UserInterest {
  // API fields
  public id: string;
  public interest: Interest;
  public level: number;

  public constructor(jsonObject?: any) {
    if (!jsonObject) {
      return;
    }

    this.id = jsonObject.id;
    this.interest = new Interest(jsonObject.interest);
    this.level = jsonObject.level;
  }
}
