import {User} from '../user/user';
import {UserFactory} from '../user/user';

// API attribute interfaces
interface UtalkCodeApiAttributes {
  claimedAt: Date;
  code: string;
  id: string;
  user: User;
  userId: string;
}

// Client interfaces
export interface UtalkCode extends UtalkCodeApiAttributes {
}

// Factories
export class UtalkCodeFactory {
  public static createUtalkCode(jsonObject?: any): UtalkCode {
    if (!jsonObject) {
      return;
    }

    return {
      claimedAt: new Date(jsonObject.claimed_at),
      code: jsonObject.code,
      id: jsonObject.id,
      user: UserFactory.createUser(jsonObject.user),
      userId: jsonObject.user_id
    };
  }
}
