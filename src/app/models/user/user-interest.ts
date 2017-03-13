import {Interest} from '../interest/interest';
import {find} from 'lodash';

export class UserInterest {
  id: string;
  interest: Interest;
  proficiency: number;

  constructor(jsonObject: any) {
    this.id = jsonObject.id;
    this.interest = new Interest(jsonObject.interest || {});
    this.proficiency = jsonObject.proficiency;
  }
}
