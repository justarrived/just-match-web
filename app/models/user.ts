import {UserImage} from "./user/user-image";
import {map} from "lodash";
import {Language} from "./language/language";
import {UserLanguage} from "./user/user-language";

export class User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  images: UserImage[];
  userLanguages: UserLanguage[];
  presentation: string;
  workExperience: string;
  education: string;
  skills: string;

  constructor(jsonObject: any) {
    this.id = jsonObject.id;
    this.firstName = jsonObject.first_name;
    this.lastName = jsonObject.last_name;
    this.email = jsonObject.email;
    this.role = jsonObject.primary_role;
    this.images = map(jsonObject.user_images, userImage => new UserImage(userImage));
    this.userLanguages = map(jsonObject.user_languages, userLanguage => new UserLanguage(userLanguage));
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
