export function namePropertyLabel(item) {
  return item && item.name;
}

export function grossSalaryLabel(item) {
  return item.grossSalary + ' ' + item.currency;
}
