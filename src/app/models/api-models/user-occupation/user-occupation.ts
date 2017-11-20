import {Occupation} from '../occupation/occupation';
import {OccupationFactory} from '../occupation/occupation';
import {User} from '../user/user';
import {UserFactory} from '../user/user';

// API attribute interfaces
interface UserOccupationApiAttributes {
  id: string;
  importance: number;
  occupation: Occupation;
  user: User;
  yearsOfExperience: number;
}

// Client interfaces
export interface UserOccupation extends UserOccupationApiAttributes {
}

// Factories
export class UserOccupationFactory {
  public static createUserOccupation(jsonObject?: any): UserOccupation {
    if (!jsonObject) {
      return;
    }

    return {
      id: jsonObject.id,
      importance: jsonObject.importance,
      occupation: OccupationFactory.createOccupation(jsonObject.occupation),
      user: UserFactory.createUser(jsonObject.user),
      yearsOfExperience: jsonObject.years_of_experience,
    };
  }
}
