export class UserProfile {
  imageToken: string;
  presentation: string;
  workExperience: string;
  education: string;
  skills: string;

  toJsonObject(): Object {
    return {
      'user_image_one_time_token': this.imageToken,
      'description': this.presentation,
      'job_experience': this.workExperience,
      'education': this.education,
      'competence_text': this.skills
    };
  }
}
