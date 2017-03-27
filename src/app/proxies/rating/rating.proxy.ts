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

  // CREATE
  public createJobRating(ratingAttributes: CreateJobRatingAttributes): Promise<Rating> {
    return this.apiCall.post('ratings', ratingAttributes)
    .then(response => RatingFactory.createRating(response.data));
  }
}
