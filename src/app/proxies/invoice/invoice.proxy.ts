import {ApiCallService} from '../../services/api-call.service';
import {Invoice} from '../../models/api-models/invoice/invoice';
import {InvoiceFactory} from '../../models/api-models/invoice/invoice';
import {Injectable} from '@angular/core';

@Injectable()
export class InvoiceProxy {

  constructor(
    private apiCallService: ApiCallService
  ) {
  }

  // CREATE
  public createApplicationInvoice(jobId: string, applicationId: string, searchParameters?: any): Promise<Invoice> {
    return this.apiCallService.post('jobs/' + jobId + '/users/' + applicationId + '/invoices', {}, searchParameters)
    .then(response => InvoiceFactory.createInvoice(response.data));
  }
}
