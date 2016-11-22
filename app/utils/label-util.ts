export function namePropertyLabel(item) {
  return item && item.name;
}

export function grossSalaryLabel(item) {
  return item.rateExcludingVAT + ' ' + item.currency + ' (' + item.grossSalary + ' ' + item.currency + ')';
}
