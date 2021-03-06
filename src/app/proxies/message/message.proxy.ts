import {ApiCallService} from '../../services/api-call.service';
import {Message} from '../../models/api-models/message/message';
import {MessageFactory} from '../../models/api-models/message/message';
import {Injectable} from '@angular/core';

// CREATE
interface CreateChatMessageAttributes {
  body: string;
  language_id?: string;
}

@Injectable()
export class MessageProxy {

  constructor(
    private apiCallService: ApiCallService
  ) {
  }

  // GET
  public getChatMessages(chatId: string, searchParameters?: any): Promise<Message[]> {
    return this.apiCallService.get('chats/' + chatId + '/messages', searchParameters)
    .then(response => response.data.map(message => MessageFactory.createMessage(message)));
  }

  public getChatMessagesWithMeta(chatId: string, searchParameters?: any): Promise<{messages: Message[], meta: any}> {
    return this.apiCallService.get('chats/' + chatId + '/messages', searchParameters)
    .then(response => {
      return {
        messages: response.data.map(message => MessageFactory.createMessage(message)),
        meta: response.meta
      }
    });
  }

  public getUserMessages(userId: string, searchParameters?: any): Promise<Message[]> {
    return this.apiCallService.get('users/' + userId + '/messages', searchParameters)
    .then(response => response.data.map(message => MessageFactory.createMessage(response.data)));
  }

  public getUserMessagesWithMeta(userId: string, searchParameters?: any): Promise<{messages: Message[], meta: any}> {
    return this.apiCallService.get('users/' + userId + '/messages', searchParameters)
    .then(response => {
      return {
        messages: response.data.map(message => MessageFactory.createMessage(message)),
        meta: response.meta
      }
    });
  }

  // CREATE
  public createChatMessage(chatId: string, messageAttributes: CreateChatMessageAttributes, searchParameters?: any): Promise<Message> {
    return this.apiCallService.post('chats/' + chatId + '/messages', messageAttributes, searchParameters)
    .then(response => MessageFactory.createMessage(response.data));
  }
}
