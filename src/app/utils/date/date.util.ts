import * as moment from 'moment';

export function yyyymmdd(date: Date) {
  var mm = date.getMonth() + 1; // getMonth() is zero-based
  var dd = date.getDate();

  return [date.getFullYear(),
    (mm > 9 ? '' : '0') + mm,
    (dd > 9 ? '' : '0') + dd
  ].join('');
};

export function nbrOfMonthsFromDate(date: Date, months: number): Date {
  return new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 30 * months);
};

export function isToday(date: Date): boolean {
  return new Date(date).setHours(0,0,0,0) == new Date().setHours(0,0,0,0);
}

export function isThisWeek(date: Date): boolean {
  return moment().isoWeek() == moment(date).isoWeek();
}
