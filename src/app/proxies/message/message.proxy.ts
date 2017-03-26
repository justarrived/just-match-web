import {ApiCall} from '../../services/api-call.service';
import {Message} from '../../models/api-models/message/message';
import {MessageFactory} from '../../models/api-models/message/message';
import {Injectable} from '@angular/core';

// CREATE
interface CreateChatMessageAttributes {
  body: string;
  language_id: string;
}

@Injectable()
export class MessageProxy {

  constructor(
    private apiCall: ApiCall
  ) {
  }

  // GET
  public getChatMessages(chatId: string, searchParameters?: any): Promise<Message[]> {
    return this.apiCall.get('chats/' + chatId + '/messages', searchParameters)
    .then(response => MessageFactory.createMessage(response.data));
  }

  public getChatMessagesWithMeta(chatId: string, searchParameters?: any): Promise<{messages: Message[], meta: {total: number}}> {
    return this.apiCall.get('chats/' + chatId + '/messages', searchParameters)
    .then(response => {
      return {
        messages: response.data.map(message => MessageFactory.createMessage(message)),
        meta: response.meta
      }
    });
  }

  // CREATE
  public createChatMessage(chatId: string, messageAttributes: CreateChatMessageAttributes): Promise<Message> {
    return this.apiCall.post('chats/' + chatId + '/messages', messageAttributes)
    .then(response => MessageFactory.createMessage(response.data));
  }
}