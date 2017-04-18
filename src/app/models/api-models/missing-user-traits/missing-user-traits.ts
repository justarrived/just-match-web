// API attribute interfaces
interface MissingUserTraitsApiAttributes {
  account_clearing_number?: { hint?: string};
  account_number?: { hint?: string};
  at_und?: { hint?: string};
  city?: { hint?: string};
  competence_text?: { hint?: string};
  country_of_origin?: { hint?: string};
  current_status?: { hint?: string};
  description?: { hint?: string};
  education?: { hint?: string};
  email?: { hint?: string};
  first_name?: { hint?: string};
  gender?: { hint?: string};
  job_experience?: { hint?: string};
  language_ids?: { hint?: string, ids: string[]};
  last_name?: { hint?: string};
  phone?: { hint?: string};
  skill_ids?: { hint?: string, ids: string[]};
  ssn?: { hint?: string};
  street?: { hint?: string};
  zip?: { hint?: string};
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

    return jsonObject;
  }
}
