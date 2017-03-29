import {User} from '../user/user';
import {UserFactory} from '../user/user';

// API attribute interfaces
interface UserImageApiAttributes {
  category: string;
  categoryName: string;
  id: string;
  imageUrl: string;
  largeImageUrl: string;
  mediumImageUrl: string;
  oneTimeToken: string;
  oneTimeTokenExpiresAt: Date;
  smallImageUrl: string;
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
      largeImageUrl: jsonObject.image_url_large,
      mediumImageUrl: jsonObject.image_url_medium,
      oneTimeToken: jsonObject.one_time_token,
      oneTimeTokenExpiresAt: new Date(jsonObject.one_time_token_expires_at),
      smallImageUrl: jsonObject.image_url_small,
      user: UserFactory.createUser(jsonObject.user),
    };
  }
}
