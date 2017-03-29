import {ApiCallService} from '../../services/api-call.service';
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
    private apiCallService: ApiCallService
  ) {
  }


  // CREATE
  public createDocument(documentAttributes: CreateDocumentAttributes, searchParameters?: any): Promise<Document> {
    return this.apiCallService.post('documents', documentAttributes, searchParameters)
    .then(response => DocumentFactory.createDocument(response.data));
  }
}
