// API attribute interfaces
interface DocumentApiAttributes {
  documentUrl: string;
  id: string;
  oneTimeToken: string;
  oneTimeTokenExpiresAt: Date;
}

// Client interfaces
export interface Document extends DocumentApiAttributes {
}

// Factories
export class DocumentFactory {
  public static createDocument(jsonObject?: any): Document {
    if (!jsonObject) {
      return;
    }

    return {
      documentUrl: jsonObject.document_url,
      id: jsonObject.id,
      oneTimeToken: jsonObject.one_time_token,
      oneTimeTokenExpiresAt: new Date(jsonObject.one_time_token_expires_at),
    };
  }
}
