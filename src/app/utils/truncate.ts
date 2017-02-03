// truncate.ts
import {Pipe, PipeTransform} from '@angular/core'

@Pipe({
  name: 'truncate'
})
export class TruncatePipe {
  transform(value: string, limit: number) : string {
    if (value.length > limit) {
      value = value.slice(0, limit);
      value += '...';
    }
    return value;
  }
}
