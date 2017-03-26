import {ApiCall} from '../../services/api-call.service';
import {Invoice} from '../../models/api-models/invoice/invoice';
import {InvoiceFactory} from '../../models/api-models/invoice/invoice';
import {Injectable} from '@angular/core';

@Injectable()
export class InvoiceProxy {

  constructor(
    private apiCall: ApiCall
  ) {
  }

  // CREATE
  public createApplicationInvoice(jobId: string, applicationId: string): Promise<Invoice> {
    return this.apiCall.post('jobs/' + jobId + '/users/' + applicationId + '/invoices')
    .then(response => InvoiceFactory.createInvoice(response.data));
  }
}
