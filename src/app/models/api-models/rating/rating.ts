import {Chat} from '../chat/chat';
import {ChatFactory} from '../chat/chat';
import {Comment} from '../comment/comment';
import {CommentFactory} from '../comment/comment';
import {Job} from '../job/job';
import {JobFactory} from '../job/job';
import {User} from '../user/user';
import {UserFactory} from '../user/user';

// API attribute interfaces
interface RatingApiAttributes {
  comment: Comment;
  id: string;
  job: Job;
  score: number;
  toUser: User;
}

// Client interfaces
export interface Rating extends RatingApiAttributes {
}

// Factories
export class RatingFactory {
  public static createRating(jsonObject?: any): Rating {
    if (!jsonObject) {
      return;
    }

    return {
      comment: CommentFactory.createComment(jsonObject.comment),
      id: jsonObject.id,
      job: JobFactory.createJob(jsonObject.job),
      score: jsonObject.score,
      toUser: UserFactory.createUser(jsonObject.to_user),
    };
  }
}
