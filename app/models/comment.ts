import {User} from "./user";

export class Comment {
  id: number;
  body: string;
  commentableId: number;
  commentableType: string;
  createdAt: number;
  owner: User;

  constructor(jsonObject: any) {
    this.id = jsonObject.id;
    this.body = jsonObject.body;
    this.commentableId = jsonObject.commentable_id;
    this.commentableType = jsonObject.commentable_type;
    this.createdAt = jsonObject.created_at;
    this.owner = new User(jsonObject.owner);
  }
}
