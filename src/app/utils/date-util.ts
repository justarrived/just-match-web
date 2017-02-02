export function yyyymmdd(date: Date) {
  var mm = date.getMonth() + 1; // getMonth() is zero-based
  var dd = date.getDate();

  return [date.getFullYear(),
    (mm > 9 ? '' : '0') + mm,
    (dd > 9 ? '' : '0') + dd
  ].join('');
};

export function nbrOfMonthsFromDate(date: Date, months: number) {
  return new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 30 * months);
};
