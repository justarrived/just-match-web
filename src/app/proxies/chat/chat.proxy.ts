import {ApiCallService} from '../../services/api-call.service';
import {Chat} from '../../models/api-models/chat/chat';
import {ChatFactory} from '../../models/api-models/chat/chat';
import {Injectable} from '@angular/core';

// CREATE
interface CreateChatAttributes {
  user_ids: string[];
}

@Injectable()
export class ChatProxy {

  constructor(
    private apiCallService: ApiCallService
  ) {
  }

  // GET
  public getChat(chatId: string, searchParameters?: any): Promise<Chat> {
    return this.apiCallService.get('chats/' + chatId, searchParameters)
    .then(response => ChatFactory.createChat(response.data));
  }

  public getChats(searchParameters?: any): Promise<Chat[]> {
    return this.apiCallService.get('chats', searchParameters)
    .then(response => response.data.map(chat => ChatFactory.createChat(chat)));
  }

  public getChatsWithMeta(searchParameters?: any): Promise<{chats: Chat[], meta: {total: number}}> {
    return this.apiCallService.get('chats', searchParameters)
    .then(response => {
      return {
        chats: response.data.map(chat => ChatFactory.createChat(chat)),
        meta: response.meta
      }
    });
  }

  // CREATE
  public createChat(chatAttributes: CreateChatAttributes): Promise<Chat> {
    return this.apiCallService.post('chats', chatAttributes)
    .then(response => ChatFactory.createChat(response.data));
  }
}
