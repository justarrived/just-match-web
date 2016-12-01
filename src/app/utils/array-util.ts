export function deleteElementFromArray(arr: any[], value: any) {
  if (!arr) {
    return;
  }

  var indexOfElement = arr.indexOf(value);
  if (indexOfElement > -1) {
    arr.splice(indexOfElement, 1);
  }
}
