import {ApiCall} from '../../services/api-call.service';
import {Document} from '../../models/api-models/document/document';
import {DocumentFactory} from '../../models/api-models/document/document';
import {Injectable} from '@angular/core';

// CREATE
interface CreateDocumentAttributes {
  document: string;
}

@Injectable()
export class DocumentProxy {

  constructor(
    private apiCall: ApiCall
  ) {
  }


  // CREATE
  public createDocument(documentAttributes: CreateDocumentAttributes): Promise<Document> {
    return this.apiCall.post('documents', documentAttributes)
    .then(response => DocumentFactory.createDocument(response.data));
  }
}
