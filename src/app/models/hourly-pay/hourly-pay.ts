export class HourlyPay {
  // API fields
  public active: boolean;
  public currency: string;
  public grossSalary: number;
  public grossSalaryDelmited: string;
  public grossSalaryWithUnit: string;
  public id: string;
  public netSalary: number;
  public netSalaryDelmited: string;
  public netSalaryWithUnit: string;
  public rateIncludingVat: number;
  public rateExcludingVat: number;
  public unit: string;

  public constructor(jsonObject: any) {
    if (!jsonObject) {
      return;
    }

    this.active = jsonObject.active;
    this.currency = jsonObject.currency;
    this.grossSalary = jsonObject.gross_salary;
    this.grossSalaryDelmited = jsonObject.gross_salary_delmited;
    this.grossSalaryWithUnit = jsonObject.gross_salary_with_unit;
    this.id = jsonObject.id;
    this.netSalary = jsonObject.net_salary;
    this.netSalaryDelmited = jsonObject.net_salary_delmited;
    this.netSalaryWithUnit = jsonObject.net_salary_with_unit;
    this.rateIncludingVat = jsonObject.rate_including_vat;
    this.rateExcludingVat = jsonObject.rate_excluding_vat;
    this.unit = jsonObject.unit;
  }
}
