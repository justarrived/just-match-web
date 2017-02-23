import {AsciiMapper} from './ascii-mapper';

export function isValidSSNCharCode(charCode): boolean {
  const isNumber = charCode >= AsciiMapper.zero && charCode <= AsciiMapper.nine;
  return isNumber || charCode === AsciiMapper.hyphen;
}
