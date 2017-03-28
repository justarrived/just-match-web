import {ApiCall} from '../../services/api-call.service';
import {Rating} from '../../models/api-models/rating/rating';
import {RatingFactory} from '../../models/api-models/rating/rating';
import {Injectable} from '@angular/core';

// CREATE
interface CreateJobRatingAttributes {
  body: string;
  language_id: string;
  score: number;
  user_id: string;
}

@Injectable()
export class RatingProxy {

  constructor(
    private apiCall: ApiCall
  ) {
  }

  // GET
  public getUserRatings(userId: string, searchParameters?: any): Promise<Rating[]> {
    return this.apiCall.get('users/' + userId + '/ratings', searchParameters)
    .then(response => response.data.map(rating => RatingFactory.createRating(rating)));
  }

  public getUserRatingsWithMeta(userId: string, searchParameters?: any): Promise<{ratings: Rating[], meta: {total: number}}> {
    return this.apiCall.get('users/' + userId + '/ratings', searchParameters)
    .then(response => {
      return {
        ratings: response.data.map(rating => RatingFactory.createRating(rating)),
        meta: response.meta
      }
    });
  }

  // CREATE
  public createJobRating(jobId: string, ratingAttributes: CreateJobRatingAttributes): Promise<Rating> {
    return this.apiCall.post('jobs/' + jobId + '/ratings', ratingAttributes)
    .then(response => RatingFactory.createRating(response.data));
  }
}
