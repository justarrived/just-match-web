import {map} from 'lodash';
import {Message} from '../message/message';
import {MessageFactory} from '../message/message';
import {User} from '../user/user';
import {UserFactory} from '../user/user';
import {UserImage} from '../user-image/user-image';
import {UserImageFactory} from '../user-image/user-image';

// API attribute interfaces
interface ChatApiAttributes {
  createdAt: Date;
  id: string;
  messages: Message[];
  userImages: UserImage[];
  users: User[];
}

// Client interfaces
export interface Chat extends ChatApiAttributes {
}

// Factories
export class ChatFactory {
  public static createChat(jsonObject?: any): Chat {
    if (!jsonObject) {
      return;
    }

    return {
      createdAt: new Date(jsonObject.created_at),
      id: jsonObject.id,
      messages: map(jsonObject.messages, message => MessageFactory.createMessage(message)),
      userImages: map(jsonObject.user_images, userImage => UserImageFactory.createUserImage(userImage)),
      users: map(jsonObject.users, user => UserFactory.createUser(user)),
    };
  }
}
