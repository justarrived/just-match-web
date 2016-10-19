import {User} from "../user";
export class UserProfile {
  id: number;
  imageToken: string;
  presentation: string;
  workExperience: string;
  education: string;
  skills: string;

  constructor(user: User) {
    this.id = user.id;
    this.presentation = user.presentation;
    this.workExperience = user.workExperience;
    this.education = user.education;
    this.skills = user.skills;
  }

  toJsonObject(): Object {
    return {
      'id': this.id,
      'user_image_one_time_token': this.imageToken,
      'description': this.presentation,
      'job_experience': this.workExperience,
      'education': this.education,
      'competence_text': this.skills
    };
  }
}
