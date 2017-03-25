// API attribute interfaces
interface HourlyPayApiAttributes {
  active: boolean;
  currency: string;
  grossSalary: number;
  grossSalaryDelmited: string;
  grossSalaryWithUnit: string;
  id: string;
  netSalary: number;
  netSalaryDelmited: string;
  netSalaryWithUnit: string;
  rateIncludingVat: number;
  rateExcludingVat: number;
  unit: string;
}

// Client interfaces
export interface HourlyPay extends HourlyPayApiAttributes {
}

// Factories
export class HourlyPayFactory {
  public static createHourlyPay(jsonObject?: any): HourlyPay {
    if (!jsonObject) {
      return;
    }

    return {
      active: jsonObject.active,
      currency: jsonObject.currency,
      grossSalary: jsonObject.gross_salary,
      grossSalaryDelmited: jsonObject.gross_salary_delmited,
      grossSalaryWithUnit: jsonObject.gross_salary_with_unit,
      id: jsonObject.id,
      netSalary: jsonObject.net_salary,
      netSalaryDelmited: jsonObject.net_salary_delmited,
      netSalaryWithUnit: jsonObject.net_salary_with_unit,
      rateIncludingVat: jsonObject.rate_including_vat,
      rateExcludingVat: jsonObject.rate_excluding_vat,
      unit: jsonObject.unit,
    };
  }
}
