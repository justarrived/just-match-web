import {Interest} from '../interest/interest';
import {InterestFactory} from '../interest/interest';
import {User} from '../user/user';
import {UserFactory} from '../user/user';

// API attribute interfaces
interface UserInterestApiAttributes {
  id: string;
  interest: Interest;
  level: number;
  user: User;
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
      user: UserFactory.createUser(jsonObject.user),
    };
  }
}
