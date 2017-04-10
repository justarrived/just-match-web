import {ApiCallService} from '../../services/api-call.service';
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
    private apiCallService: ApiCallService
  ) {
  }

  // GET
  public getUserRatings(userId: string, searchParameters?: any): Promise<Rating[]> {
    return this.apiCallService.get('users/' + userId + '/ratings', searchParameters)
    .then(response => response.data.map(rating => RatingFactory.createRating(rating)));
  }

  public getUserRatingsWithMeta(userId: string, searchParameters?: any): Promise<{ratings: Rating[], meta: any}> {
    return this.apiCallService.get('users/' + userId + '/ratings', searchParameters)
    .then(response => {
      return {
        ratings: response.data.map(rating => RatingFactory.createRating(rating)),
        meta: response.meta
      }
    });
  }

  // CREATE
  public createJobRating(jobId: string, ratingAttributes: CreateJobRatingAttributes, searchParameters?: any): Promise<Rating> {
    return this.apiCallService.post('jobs/' + jobId + '/ratings', ratingAttributes, searchParameters)
    .then(response => RatingFactory.createRating(response.data));
  }
}
