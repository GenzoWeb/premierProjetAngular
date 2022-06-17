import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convertHours'
})
export class ConvertHoursPipe implements PipeTransform {

  transform(minutes: number): string {
    let hours: number = Math.trunc(minutes / 60);
    let minutesEnd: number = minutes - (hours * 60);
    let duration: string = hours + 'h' + minutesEnd + 'min';
    return duration;
  }

}
