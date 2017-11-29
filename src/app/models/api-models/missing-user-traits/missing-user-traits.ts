// API attribute interfaces
interface MissingUserTraitsApiAttributes {
  at_und?: {hint?: string};
  bank_account?: {hint?: string};
  city?: {hint?: string};
  competence_text?: {hint?: string};
  country_of_origin?: {hint?: string};
  current_status?: {hint?: string};
  cv?: {hint?: string};
  description?: {hint?: string};
  education?: {hint?: string};
  email?: {hint?: string};
  facebook_url?: {hint?: string};
  first_name?: {hint?: string};
  gender?: {hint?: string};
  interest_ids?: {hint?: string, ids?: string[]};
  job_experience?: {hint?: string};
  language_ids?: {hint?: string, ids?: string[]};
  last_name?: {hint?: string};
  linkedin_url?: {hint?: string};
  occupation_ids?: {hint?: string, ids?: string[]};
  personal_letter?: {hint?: string};
  phone?: {hint?: string};
  skill_ids?: {hint?: string, ids?: string[]};
  ssn?: {hint?: string};
  street?: {hint?: string};
  zip?: {hint?: string};
}

// Client interfaces
export interface MissingUserTraits extends MissingUserTraitsApiAttributes {
}

// Factories
export class MissingUserTraitsFactory {
  public static createMissingUserTraits(jsonObject?: any): MissingUserTraits {
    if (!jsonObject) {
      return;
    }

    delete jsonObject.id;
    return jsonObject;
  }
}
