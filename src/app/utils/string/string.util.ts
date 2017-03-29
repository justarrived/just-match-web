import {AsciiMapper} from '../ascii-mapper/ascii-mapper.util';

export function compareStrings(a: string, b: string): number {
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
}

export function isValidSSNCharCode(charCode): boolean {
  const isNumber = charCode >= AsciiMapper.zero && charCode <= AsciiMapper.nine;
  return isNumber || charCode === AsciiMapper.hyphen;
}
