export class UserBankAccount {
  clearingNumber: string;
  accountNumber: string;

  toJsonObject(): Object {
    return {
      account_clearing_number: this.clearingNumber,
      account_number: this.accountNumber
    };
  }
}
