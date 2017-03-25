import {Interest} from '../interest/interest';
import {InterestFactory} from '../interest/interest';

// API attribute interfaces
interface UserInterestApiAttributes {
  id: string;
  interest: Interest;
  level: number;
}

// Client interfaces
export interface UserInterest extends UserInterestApiAttributes {
}

// Factories
export class UserInterestFactory {
  public static createUserInterest(jsonObject?: any): UserInterest {
    if (!jsonObject) {
      return;
    }

    return {
      id: jsonObject.id,
      interest: InterestFactory.createInterest(jsonObject.interest),
      level: jsonObject.level,
    };
  }
}
