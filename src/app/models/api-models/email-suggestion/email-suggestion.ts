// API attribute interfaces
interface EmailSuggestionApiAttributes {
  address: string;
  domain: string;
  full: string;
  id: string;
}

// Client interfaces
export interface EmailSuggestion extends EmailSuggestionApiAttributes {
}

// Factories
export class EmailSuggestionFactory {
  public static createEmailSuggestion(jsonObject?: any): EmailSuggestion {
    if (!jsonObject) {
      return;
    }

    return {
      address: jsonObject.address,
      domain: jsonObject.domain,
      full: jsonObject.full,
      id: jsonObject.id
    };
  }
}
