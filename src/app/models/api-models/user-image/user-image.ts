import {User} from '../user/user';
import {UserFactory} from '../user/user';

// API attribute interfaces
interface UserImageApiAttributes {
  category: string;
  categoryName: string;
  id: string;
  imageUrl: string;
  imageUrlLarge: string;
  imageUrlMedium: string;
  oneTimeToken: string;
  oneTimeTokenExpiresAt: Date;
  imageUrlSmall: string;
  user: User;
}

// Client interfaces
export interface UserImage extends UserImageApiAttributes {
}

// Factories
export class UserImageFactory {
  public static createUserImage(jsonObject?: any): UserImage {
    if (!jsonObject) {
      return;
    }

    return {
      category: jsonObject.category,
      categoryName: jsonObject.category_name,
      id: jsonObject.id,
      imageUrl: jsonObject.image_url,
      imageUrlLarge: jsonObject.image_url_large,
      imageUrlMedium: jsonObject.image_url_medium,
      oneTimeToken: jsonObject.one_time_token,
      oneTimeTokenExpiresAt: new Date(jsonObject.one_time_token_expires_at),
      imageUrlSmall: jsonObject.image_url_small,
      user: UserFactory.createUser(jsonObject.user),
    };
  }
}
