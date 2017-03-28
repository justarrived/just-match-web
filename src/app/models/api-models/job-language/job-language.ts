import {Job} from '../job/job';
import {JobFactory} from '../job/job';
import {Language} from '../language/language';
import {LanguageFactory} from '../language/language';

// TODO verify that the spec looks like below

// API attribute interfaces
interface JobLanguageApiAttributes {
  id: string;
  job: Job;
  language: Language;
}

// Client interfaces
export interface JobLanguage extends JobLanguageApiAttributes {
}

// Factories
export class JobLanguageFactory {
  public static createJobLanguage(jsonObject?: any): JobLanguage {
    if (!jsonObject) {
      return;
    }

    return {
      id: jsonObject.id,
      language: LanguageFactory.createLanguage(jsonObject.language),
      job: JobFactory.createJob(jsonObject.job),
    };
  }
}
