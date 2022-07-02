import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncateText'
})
export class TruncateTextPipe implements PipeTransform {

  transform(value: string, limit = 20): string {
      return value.split(" ").splice(0,limit).join(" ");
  }
}