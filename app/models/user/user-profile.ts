import {User} from "../user";
import {map} from "lodash";
import {UserLanguage} from "./user-language";

export class UserProfile {
  id: number;
  imageToken: string;
  imageUrl: string;
  presentation: string;
  userLanguages: UserLanguage[];
  workExperience: string;
  education: string;
  skills: string;

  constructor(user: User) {
    this.id = user.id;
    this.imageUrl = (user.images && user.images[0] && user.images[0].imageUrl) || 'assets/images/placeholder-profile-image.png';
    this.presentation = user.presentation;
    this.userLanguages = user.userLanguages || [];
    this.workExperience = user.workExperience;
    this.education = user.education;
    this.skills = user.skills;
  }

  toJsonObject(): Object {
    return {
      'id': this.id,
      'user_image_one_time_token': this.imageToken,
      'description': this.presentation,
      'language_ids': map(this.userLanguages, userLanguage => {
        return {
          id: userLanguage.language.id,
          proficiency: userLanguage.proficiency.proficiency
        };
      }),
      'job_experience': this.workExperience,
      'education': this.education,
      'competence_text': this.skills
    };
  }
}
