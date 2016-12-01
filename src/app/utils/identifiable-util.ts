import {map} from "lodash";

export function getIds(list: any[]) {
  if (!list) {
    return [];
  }

  return map(list, 'id');
}
