import {User} from "../user";
import {Language} from "../language/language";
import {map} from "lodash";

export class UserProfile {
  id: number;
  imageToken: string;
  imageUrl: string;
  presentation: string;
  languages: Language[];
  workExperience: string;
  education: string;
  skills: string;

  constructor(user: User) {
    this.id = user.id;
    this.imageUrl = (user.images && user.images[0] && user.images[0].imageUrl) || 'app/assets/images/placeholder-profile-image.png';
    this.presentation = user.presentation;
    this.languages = user.languages || [];
    this.workExperience = user.workExperience;
    this.education = user.education;
    this.skills = user.skills;
  }

  toJsonObject(): Object {
    return {
      'id': this.id,
      'user_image_one_time_token': this.imageToken,
      'description': this.presentation,
      'language_ids': map(this.languages, language => {
        return {
          id: language.id,
          proficiency: language.proficiency.proficiency
        };
      }),
      'job_experience': this.workExperience,
      'education': this.education,
      'competence_text': this.skills
    };
  }
}
