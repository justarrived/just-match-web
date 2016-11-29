export class UserBankAccount {
  clearingNumber: string;
  accountNumber: string;
  iban: string;
  bic: string;

  toJsonObject(onlyIban: boolean = false): Object {
    if (onlyIban) {
      return {
        iban: this.iban,
        bic: this.bic
      };
    } else {
      return {
        account_clearing_number: this.clearingNumber,
        account_number: this.accountNumber
      };
    }
  }
}
