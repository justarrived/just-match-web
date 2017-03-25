// API attribute interfaces
interface InvoiceApiAttributes {
  id: number;
}

// Client interfaces
export interface Invoice extends InvoiceApiAttributes {
}

// Factories
export class InvoiceFactory {
  public static createInvoice(jsonObject?: any): Invoice {
    if (!jsonObject) {
      return;
    }

    return {
      id: jsonObject.id,
    };
  }
}
