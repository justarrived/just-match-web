export class User {
  id: number;
  email: string;
  role: string;
  presentation: string;
  workExperience: string;
  education: string;
  skills: string;

  constructor(jsonObject: any) {
    this.id = jsonObject.id;
    this.email = jsonObject.email;
    this.role = jsonObject.primary_role;
    this.presentation = jsonObject.description;
    this.workExperience = jsonObject.job_experience;
    this.education = jsonObject.education;
    this.skills = jsonObject.competence_text;
  }

  toJsonObject(): Object {
    return {
      'email': this.email,
      'primary-role': this.role
    };
  }
}
